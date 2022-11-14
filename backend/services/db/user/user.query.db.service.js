import sqlite3 from "sqlite3"

let db = new (sqlite3.verbose()).Database('./db.sqlite');

export default {
    login: (login, password) => {
        return new Promise((resolve, reject) => {
            let sql = 'SELECT * FROM user WHERE login = (?) AND password = (?)';
            db.get(sql, [login, password], (err, user) => {
                if (err && user === null) {
                    reject(err);
                }
                resolve(user);
            })
        })
    }
}