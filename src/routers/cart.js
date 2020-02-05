const express = require('express');
const cartController = require('../controllers/cart');
const Router = express.Router();
const checkAuth = require('../helpers/auth');

Router.get('/', checkAuth, cartController.getCart)
.get('/:id', cartController.cartDetail)
.post('/', checkAuth, cartController.insertCart)
.post('/checkout', checkAuth, cartController.insertOrders)
.patch('/:id', cartController.updateCart)
.delete('/:id', cartController.deleteCart)

module.exports = Router;