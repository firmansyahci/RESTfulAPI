const connection = require('../configs/db');

module.exports = {
    getCart: (userId) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM cart WHERE user_id = ?", userId, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    cartDetail: (id, userId) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM cart WHERE id = ? AND user_id = ?", [id, userId], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertCart: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO cart SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateCart: (data, id, userId) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE cart SET ? WHERE id = ? AND user_id = ?", [data, id, userId], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteCart: (id, userId) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM cart WHERE id = ? AND user_id = ?", [id, userId], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    selectProduct: (idProduct) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE id = ?", idProduct, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        })
    },
    updateProduct: (updateStock, idProduct) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE product SET stock = ? WHERE id = ?", [updateStock, idProduct], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
};