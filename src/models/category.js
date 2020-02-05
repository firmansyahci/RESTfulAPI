const connection = require('../configs/db');

module.exports = {
    getCategory: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM categories", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    categoryDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM categories WHERE categories.id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertCategory: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO categories SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateCategory: (data, id) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE categories SET ? WHERE id = ?", [data, id], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteCategory: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM categories WHERE id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    }
};