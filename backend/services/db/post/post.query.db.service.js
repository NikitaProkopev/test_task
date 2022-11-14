import sqlite3 from "sqlite3"
import graphql, {GraphQLError} from "graphql";
import createSqlByIdsUtility from "../../../utilities/create.sql.by.ids.utility.js";

let db = new (sqlite3.verbose()).Database('./db.sqlite');

export default {
    getPosts: (page, perPage, orderFieldName, orderTypeName, filter) => {
        //TODO filter by another params
        let sql = '';
        let params = [];
        if(checkFilterFieldsIsExist(filter)) {
            sql += 'SELECT * FROM(';
        }
        sql += 'SELECT posts.id, posts.title, posts.img || " " || posts.text as description, posts.createDate, posts.author, group_concat(categories.name) AS categories ' +
            'FROM posts ' +
            `INNER JOIN categories ` +
            'ON instr(posts.categories, categories.id) > 0 ' +
            'GROUP BY posts.id'
        if (orderFieldName && orderTypeName) {
            if (orderFieldName === 'categories') {
                sql += ` ORDER BY categories.name ${orderTypeName} `
            } else if(orderFieldName === 'description') {
                sql += ` ORDER BY posts.text ${orderTypeName} `
            } else {
                sql += ` ORDER BY posts.${orderFieldName} ${orderTypeName} `
            }
        }
        if (checkFilterFieldsIsExist(filter)) {
            sql += ') WHERE ';
            if (filter.id) {
                sql += 'instr(id, (?)) > 0';
                params.push(filter.id);
                if(filter.title || filter.description || filter.createDate || filter.author ||
                    (filter.categories && filter.categories.length > 0)) {
                    sql += ' AND ';
                }
            }
            if (filter.title) {
                sql += 'instr(title, (?)) > 0';
                params.push(filter.title);
                if(filter.description || filter.createDate || filter.author ||
                    (filter.categories && filter.categories.length > 0)) {
                    sql += ' AND ';
                }
            }
            if (filter.description) {
                sql += 'instr(description, (?)) > 0';
                params.push(filter.description);
                if(filter.createDate || filter.author ||
                    (filter.categories && filter.categories.length > 0)) {
                    sql += ' AND ';
                }
            }
            if (filter.createDate) {
                sql += 'instr(createDate, (?)) > 0';
                params.push(filter.createDate);
                if(filter.author || filter.categories && filter.categories.length > 0) {
                    sql += ' AND ';
                }
            }
            if (filter.author) {
                sql += 'instr(author, (?)) > 0';
                params.push(filter.author);
                if(filter.categories && filter.categories.length > 0) {
                    sql += ' AND ';
                }
            }
            if (filter.categories && filter.categories.length > 0) {
                filter.categories.forEach((item, index) => {
                    sql += 'instr(categories, (?)) ';
                    if (index !== filter.categories.length - 1) {
                        sql += 'AND '
                    }
                    params.push(item);
                })
            }
        }
        sql +=` LIMIT (?)`;
        params.push(perPage);
        if (page > 1) {
            sql += ` OFFSET (?)`;
            params.push(((page - 1) * perPage) + 1);
        }

        return new Promise((resolve, reject) => {
            db.all(sql, params,(err, posts ) => {
                if (err) {
                    reject(new GraphQLError(err.message));
                }
                if (posts && posts.length > 0 ) {
                    posts = posts.map((post) => {
                        post.categories = post.categories.split(',').join(', ');
                        return post
                    })
                }
                resolve(posts);
            });
        })
    },
    getPost: (id) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT posts.id, posts.title, posts.img, posts.text, posts.createDate, posts.author, group_concat(categories.name) AS categories ' +
                'FROM posts ' +
                `INNER JOIN categories ` +
                'ON instr(posts.categories, categories.id) > 0 ' +
                'WHERE posts.id = (?) ' +
                'GROUP BY posts.id '
            db.get(sql, [id], (err, post) => {
                if(err) {
                    reject(new graphql.GraphQLError(err.message))
                }
                if (post) {
                    resolve(post);
                } else {
                    db.get('SELECT * FROM posts WHERE id = (?)', [id], (err, post) => {
                        if (err) {
                            reject(err);
                        }
                        resolve(post);
                    })
                }
            })
        })
    },
    checkIsIdsExist: (ids) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT id FROM posts WHERE EXISTS(SELECT id FROM posts WHERE'
            sql += createSqlByIdsUtility.createSQLbyIds(ids);
            db.all(sql, ids, (err, rows) => {
                if (err) {
                    reject(new graphql.GraphQLError(err.message))
                }
                let result = ids.map((item) => {
                    return !!rows.find((item2) => item2.id === item)
                })
                resolve(result)
            })
        })
    },
    getPagesCount: (perPage, filter) => {
        let params = [];
        let sql = 'SELECT COUNT(*) AS count FROM(';
        sql += 'SELECT posts.id, posts.title, posts.img || " " || posts.text as description, posts.createDate, posts.author, group_concat(categories.name) AS categories ' +
            'FROM posts ' +
            `INNER JOIN categories ` +
            'ON instr(posts.categories, categories.id) > 0';
        if (checkFilterFieldsIsExist(filter)) {
            sql += ' WHERE ';
            if (filter.id) {
                sql += 'instr(posts.id, (?)) > 0';
                params.push(filter.id);
                if(filter.title || filter.description || filter.createDate || filter.author ||
                    (filter.categories && filter.categories.length > 0)) {
                    sql += ' AND ';
                }
            }
            if (filter.title) {
                sql += 'instr(posts.title, (?)) > 0';
                params.push(filter.title);
                if(filter.description || filter.createDate || filter.author ||
                    (filter.categories && filter.categories.length > 0)) {
                    sql += ' AND ';
                }
            }
            if (filter.description) {
                sql += 'instr(posts.description, (?)) > 0';
                params.push(filter.description);
                if(filter.createDate || filter.author ||
                    (filter.categories && filter.categories.length > 0)) {
                    sql += ' AND ';
                }
            }
            if (filter.createDate) {
                sql += 'instr(posts.createDate, (?)) > 0';
                params.push(filter.createDate);
                if(filter.author || filter.categories && filter.categories.length > 0) {
                    sql += ' AND ';
                }
            }
            if (filter.author) {
                sql += 'instr(posts.author, (?)) > 0';
                params.push(filter.author);
                if(filter.categories && filter.categories.length > 0) {
                    sql += ' AND ';
                }
            }
            if (filter.categories && filter.categories.length > 0) {
                filter.categories.forEach((item, index) => {
                    sql += 'instr(posts.categories, (?)) ';
                    if (index !== filter.categories.length - 1) {
                        sql += 'AND '
                    }
                    params.push(item);
                })
            }

        }
        sql += ' GROUP BY posts.id)';
        console.log(sql);
        return new Promise((resolve, reject) => {
            db.get(sql, params, (err, count) => {
                if (err) {
                    reject(new GraphQLError(err.message))
                }
                if(count && count.count > 1) {
                    resolve(Math.ceil((count.count - 1) / perPage));
                } else {
                    resolve(1);
                }
            })
        })
    }

}

function checkFilterFieldsIsExist(filters) {
    return filters && ( filters.id || filters.title || filters.description ||
        filters.createDate || filters.author ||
        (filters.categories && filters.categories.length !== 0))
}