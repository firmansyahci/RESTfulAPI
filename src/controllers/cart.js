const cartModel = require('../models/cart');
const ordersModel = require('../models/orders');
const miscHelper = require('../helpers/helpers');
const checkAuth = require('../helpers/auth');
const jwt = require('jsonwebtoken');

module.exports = {
    getCart: (req, res) => {
        const token = req.headers.authorization.split(" ")[1];           
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        cartModel.getCart(userId)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    cartDetail: (req, res) => {
        const id = req.params.id;
        const token = req.headers.authorization.split(" ")[1];           
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        cartModel.cartDetail(id, userId)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    insertCart: (req, res) => {
        const token = req.headers.authorization.split(" ")[1];           
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const {product_id, qty} = req.body;
        const data = {
            user_id: decoded.userId,
            product_id,
            qty
        };

        const idProduct = data.product_id;
        if (data.qty < 1) {
            res.json({
                message: "Product qty tidak boleh kosong atau minus"
            })
        } else {
            cartModel.selectProduct(idProduct)
            .then((result) => {
                if (result.length < 1) {
                    res.json({
                        message: "Product tidak ditemukan"
                    })
                } else {
                    const stock = result[0].stock;
                    const updateStock = stock - data.qty; 
                    if (updateStock < 0) {
                        res.json({
                            message: "Stock tidak mencukupi"
                        })
                    } else {
                        const price = result[0].price;
                        data.total_price = data.qty * price;
                        cartModel.updateProduct(updateStock, idProduct)
                        .then((result) => {
                            cartModel.insertCart(data)
                            .then((result) => {
                                miscHelper.response(res, result, 201);
                            })
                            .catch(err => console.log(err));
                        })
                        .catch(err => console.log(err));
                    }
                }
            })
            .catch(err => console.log(err));
        }
    },
    updateCart: (req, res) => {
        const id = req.params.id;
        const token = req.headers.authorization.split(" ")[1];           
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;
        const {product_id, qty} = req.body;
        const data = {
            product_id,
            qty
        };

        const idProduct = data.product_id;
        if (data.qty < 1) {
            res.json({
                message: "Product qty tidak boleh kosong atau minus"
            })
        } else {
            cartModel.cartDetail(id, userId)
            .then((result) => {
                if (result.length < 1) {
                    res.json({
                        message: "Id cart tidak ditemukan"
                    });
                } else {  
                    const idProduct = result[0].product_id;
                    const oldQty = result[0].qty;
                    const newQty = data.qty;
                    cartModel.selectProduct(idProduct)
                    .then((result) => {
                        if (result.length < 1) {
                            res.json({
                                message: "Product tidak ditemukan"
                            });
                        } else {
                            const stock = result[0].stock;
                            const updateStock = stock + oldQty - newQty;
                            if (updateStock < 0) {
                                res.json({
                                    message: "Stock tidak mencukupi"
                                })
                            } else {
                                cartModel.updateProduct(updateStock, idProduct)
                                .then((result) => {
                                    cartModel.updateCart(data, id, userId)
                                    .then((result) => {
                                        miscHelper.response(res, result, 200);
                                    })
                                    .catch(err => console.log(err));
                                })
                                .catch(err => console.log(err));
                            }
                        }
                    })
                    .catch(err => console.log(err));   
                }
            })
            .catch(err => console.log(err))
        }
    },
    deleteCart: (req, res) => {
        const id = req.params.id;
        const token = req.headers.authorization.split(" ")[1];           
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;

        cartModel.cartDetail(id, userId)
        .then((result) => {
            if (result.length < 1) {
                res.json({
                    message: "Id cart tidak ditemukan"
                })
            } else {
                const idProduct = result[0].product_id;
                const qty = result[0].qty;
                cartModel.selectProduct(idProduct)
                .then((result) => {
                    const stock = result[0].stock;
                    const updateStock = stock + qty;
                    cartModel.updateProduct(updateStock, idProduct)
                    .then((result) => {
                        cartModel.deleteCart(id, userId)
                        .then((result) => {
                            miscHelper.response(res, result, 200);
                        })
                        .catch(err => console.log(err));
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err))
    },
    insertOrders: (req, res) => {
        const token = req.headers.authorization.split(" ")[1];           
        const decoded = jwt.verify(token, process.env.JWT_KEY);
        const userId = decoded.userId;

        ordersModel.getTotalCart(userId)
        .then((result) => {
            if (result[0].qty === null) {
                res.json({
                    message: "tidak ada barang pada cart"
                })
            } else {
                const data = {
                    user_id: userId,
                    qty: result[0].qty,
                    price: result[0].total_price
                };
                ordersModel.insertOrders(data)
                .then((result) => {
                    miscHelper.response(res, result, 201);
                    let idOrders = result.insertId;
                    cartModel.getCart(userId)
                    .then((result) => {
                        let dataCart;
                        let idCart;
                        let lineNbr = 1;
                        result.forEach(dataArray => {
                            dataCart = {
                                id: idOrders,
                                product_id: dataArray.product_id,
                                qty: dataArray.qty,
                                total_price: dataArray.total_price,
                                line_nbr: lineNbr
                            };
                            idCart = dataArray.id;
                            ordersModel.insertOrderDetails(dataCart);
                            cartModel.deleteCart(idCart, userId);
                            lineNbr++;
                        });
                    })
                    .catch(err => console.log(err));
                })
                .catch(err => console.log(err));
            }
        })
        .catch(err => console.log(err));
    },
};