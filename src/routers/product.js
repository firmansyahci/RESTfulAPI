const express = require('express');
const multer = require('multer');
const checkAuth = require('../helpers/auth');

const storage = multer.diskStorage({
    destination: function(req, file, cb) {
        cb(null, './uploads');
    },
    filename: function(req, file, cb) {
        cb(null, Date.now() + file.originalname);
    }
});

const upload = multer({
    storage
});

const productController = require('../controllers/product');
const Router = express.Router();

Router.get('/', checkAuth, productController.getProduct)
.get('/sort', productController.sortProduct)
.get('/:id', productController.productDetail)
.get('/search/:name', productController.searchProduct)
.get('/pagination/:page/', productController.paginationProduct)
.post('/', upload.single('image'), productController.insertProduct)
.patch('/:id', upload.single('image'), productController.updateProduct)
.delete('/:id', productController.deleteProduct)


module.exports = Router;