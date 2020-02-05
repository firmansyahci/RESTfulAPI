const express = require('express');
const categoryController = require('../controllers/category');
const Router = express.Router();

Router.get('/', categoryController.getCategory)
.get('/:id', categoryController.categoryDetail)
.post('/', categoryController.insertCategory)
.patch('/:id', categoryController.updateCategory)
.delete('/:id', categoryController.deleteCategory)

module.exports = Router;