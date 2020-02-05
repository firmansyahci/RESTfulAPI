const express = require('express');
const userController = require('../controllers/user');
const Router = express.Router();

Router.post('/signup', userController.insertUser)
.post('/login', userController.loginUser)
.get('/', userController.getUser)

module.exports = Router;