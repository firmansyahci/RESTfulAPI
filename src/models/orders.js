const connection = require('../configs/db');

module.exports = {
    getOrders: (userId) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM orders WHERE user_id = ?", userId, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    ordersDetail: (id, userId) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM orders WHERE id = ? AND user_id = ?", [id, userId], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    ordersDetailItem: (id, userId) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM order_details WHERE id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertOrders: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO orders SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertOrderDetails: (dataCart) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO order_details SET ?", dataCart, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    getTotalCart: (userId) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT SUM(qty) as qty, SUM(total_price) as total_price FROM cart WHERE user_id = ?", userId, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    }
};