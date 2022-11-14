import sqlite3 from "sqlite3"

let db = new (sqlite3.verbose()).Database('./db.sqlite');

export default {
    getCategories: (name, notInclude) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM categories';
            let params = [];
            if (name.length !== 0) {
                sql += ' WHERE instr(name, (?))';
                params.push(name);
            }
            if (notInclude.length !== 0) {
                if (name.length === 0) {
                    sql += ' WHERE '
                } else {
                    sql += ' AND '
                }
                notInclude.forEach((item, index) => {
                    sql += 'instr(name, (?)) = 0'
                    params.push(notInclude[index]);
                    if(index !== notInclude.length - 1) {
                        sql += ' AND '
                    }
                })
            }
            db.all(sql, params, (err, rows) => {
                if(err) {
                    reject(err.message);
                }
                resolve(rows);
            })
        })
    }
}