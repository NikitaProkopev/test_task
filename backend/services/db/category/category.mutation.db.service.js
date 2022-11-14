import sqlite3 from "sqlite3"
import graphql, {GraphQLError} from "graphql";
import e from "express";

let db = new (sqlite3.verbose()).Database('./db.sqlite');

export default {
    addNewPostCategories: (categories) => {
        return new Promise((resolve, reject) => {
            let addCategoriesPromises = [];
            if (categories && categories.length > 0) {
                console.log(categories);
                categories.forEach((item) => {
                    addCategoriesPromises.push(new Promise((resolve, reject) => {
                        createCategory(item)
                            .then((result) => {
                                resolve(result)
                            })
                            .catch((err) => {
                                reject(err)
                            });
                    }));
                })
            }
            Promise.all(addCategoriesPromises)
                .then((categories) => {
                    resolve(categories);
                })
                .catch((err) => {
                    reject(err);
                });
        })
    },
    updatePostCategories: function (categories) {
        return new Promise ((resolve, reject) => {
            this.addNewPostCategories(categories)
              .then((categoriesIds) => {
                this.deletePostCategories()
                    .then(() => resolve(categoriesIds))
                    .catch(err => reject(err))
              })
              .catch((err) => {
                  reject(err)
              })
        });
    },
    deletePostCategories: function () {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT 1, group_concat(id, ",") AS ids FROM categories WHERE ' +
                '(SELECT count(*) from posts WHERE instr(categories, categories.id) > 0) = 0 AND id = categories.id GROUP BY 1';
            db.get(sql, (err, ids) => {
                if(ids && ids.ids) {
                    deleteCategories(ids.ids).then(() => {
                        resolve();
                    })
                        .catch(err => {
                            reject(err);
                        });
                } else {
                    resolve();
                }
            })
        })
    }
}

function createCategory (name) {
    return new Promise((resolve, reject) => {
        db.run('INSERT INTO categories (id, name) VALUES (NULL, (?))', [name], (err) => {
            db.get(`SELECT id FROM categories WHERE name = "${name}"`, (err, category ) => {
                if(err) {
                    reject(err.message);
                }
                if (category) resolve(category.id);
            })
        })
    });
}

function deleteCategories (ids) {
    return new Promise((resolve, reject) => {
        let sql = 'DELETE FROM categories WHERE instr((?), id)'
        db.run(sql, [ids], (err) => {
            if (err) {
                reject(err);
            } else {
                resolve();
            }
        })
    })
}
