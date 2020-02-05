const express = require('express');
const product = require('./product');
const category = require('./category');
const user = require('./user');
const cart = require('./cart');
const orders = require('./orders');
const Router = express.Router();

Router.use('/product', product);
Router.use('/category', category);
Router.use('/user', user);
Router.use('/cart', cart);
Router.use('/orders', orders);

module.exports = Router;