import graphql from "graphql";
import sqlite3 from "sqlite3"
import categoryMutationDbService from "../category/category.mutation.db.service.js";

let db = new (sqlite3.verbose()).Database('./db.sqlite');

const service = {
    createPost: function (title, text, img, createDate, author, categories, id) {
        return new Promise((resolve, reject) => {
            categoryMutationDbService.addNewPostCategories(categories)
                .then((categoriesIds) => {
                    let sql = `INSERT INTO posts (title, text, img, createDate, author, categories, ${id ? 'id': ''}) ` +
                    `VALUES (${id ? '?, ': ''}?, ?, ?, ?, ?, ?)`;
                    let params = [title, text, img, createDate, author, categoriesIds];
                    if (id) {
                        params.push(id);
                    }
                    db.run(sql, params, (err) => {
                        if (err) {
                            console.log(err);
                            reject(new graphql.GraphQLError(err.message));
                        }
                        resolve('Post was created')

                    });
                })
                .catch((err) => { reject(err) });
        })
    },
    updatePost: (id, title, text, img, createDate, author, categories) => {
        return new Promise((resolve, reject) => {
            let sql = 'UPDATE posts SET title = (?),  text = (?),  img = (?),  ' +
                'createDate = (?),  author = (?)';
            let params = [title, text, img, createDate, author];
            if (categories && categories.length > 0) {
                sql += ',  categories = (?)';
                params.push(categories.join(','));
            }
            if (!categories || (categories && categories.length === 0)) {
                sql += ', categories = NULL'
            }
            sql += ' WHERE id = (?)'
            params.push(id);
            categoryMutationDbService.updatePostCategories(categories)
                .then((categoriesIds) => {
                    params[params.length - 2] = categoriesIds.join(',');
                    db.run(sql, params, (err) => {
                        if (err) {
                            reject(err.message);
                        }
                        resolve('Post was updated');
                    })
                })
                .catch((err) => {
                    reject(err);
                });
        });
    },
    deletePost: (id) => {
        return new Promise((resolve, reject) => {
            db.run('DELETE from posts WHERE id = (?);', [id], (err) => {
                if (err) {
                    reject(err.message);
                }
                resolve(`Post ${id} deleted`);

            });
        })
    },
}

export default service