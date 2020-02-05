const connection = require('../configs/db');
const fs = require('fs');

module.exports = {
    getProduct: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    productDetail: (id) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT product.*, categories.name FROM product LEFT JOIN categories ON product.category_id = categories.id WHERE product.id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    insertProduct: (data) => {
        return new Promise((resolve, reject) => {
            connection.query("INSERT INTO product SET ?", data, (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    updateProduct: (data, id, path) => {
        return new Promise((resolve, reject) => {
            connection.query("UPDATE product SET ? WHERE id = ?", [data, id], (err, result) => {
                if (!err) {
                    resolve(result);
                    fs.unlink(path, (err) => {
                        console.error("Error occurred while trying to remove file");
                    });
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    deleteProduct: (id, path) => {
        return new Promise((resolve, reject) => {
            connection.query("DELETE FROM product WHERE id = ?", id, (err, result) => {
                if (!err) {
                    resolve(result);                    
                    fs.unlink(path, (err) => {
                        console.error("Error occurred while trying to remove file");
                    });
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    searchProduct: (name) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product WHERE name LIKE ?", '%'+name+'%', (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    sortProduct: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product ORDER BY name", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    paginationProduct: (limit, offset) => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT * FROM product LIMIT ? OFFSET ?", [parseInt(limit), parseInt(offset)], (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    },
    countProduct: () => {
        return new Promise((resolve, reject) => {
            connection.query("SELECT COUNT (*) AS rows FROM product", (err, result) => {
                if (!err) {
                    resolve(result);
                } else {
                    reject(new Error(err));
                }
            });
        });
    }
};