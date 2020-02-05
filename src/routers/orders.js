const express = require('express');
const orderController = require('../controllers/orders');
const Router = express.Router();
const checkAuth = require('../helpers/auth');

Router.get('/', checkAuth, orderController.getOrders)
.get('/:id', checkAuth, orderController.orderDetails);

module.exports = Router;