const productModel = require('../models/product');
const miscHelper = require('../helpers/helpers');
const bodyParser = require('body-parser');

module.exports = {
    getProduct: (req, res) => {
        productModel.getProduct()
        .then((result) => {           
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    productDetail: (req, res) => {
        const id = req.params.id;
        productModel.productDetail(id)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    insertProduct: (req, res) => {
        const {name, description, stock, price, category_id} = req.body;
        const data = {
            name,
            description,
            stock,
            price,
            category_id,
            image: `http://localhost:3000/uploads/${req.file.filename}`
        };
        productModel.insertProduct(data)
        .then((result) => {
            miscHelper.response(res, result, 201);
        })
        .catch(err => console.log(err));
    },
    updateProduct: (req, res) => {
        const {name, description, stock, price, category_id} = req.body;
        const data = {
            name,
            description,
            stock,
            price,
            category_id,
            image: `http://localhost:3000/uploads/${req.file.filename}`
        };
        const id = req.params.id;
        productModel.productDetail(id)
        .then((result) => {
            let path;
            try{
                path = result[0].image.replace('http://localhost:3000','.');
             } catch {
                 path = '';
             }
            productModel.updateProduct(data, id, path)
            .then((result) => {
                miscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    deleteProduct: (req, res) => {
        const id = req.params.id;
        productModel.productDetail(id)
        .then((result) => {
            let path;
            try{
               path = result[0].image.replace('http://localhost:3000','.');
            } catch {
                path = '';
            }
            productModel.deleteProduct(id, path)
            .then((result) => {
                miscHelper.response(res, result, 200);
            })
            .catch(err => console.log(err));
        })
        .catch(err => console.log(err));
    },
    searchProduct: (req, res) => {
        const name = req.params.name;
        productModel.searchProduct(name)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    sortProduct: (req, res) => {
        productModel.sortProduct()
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    paginationProduct: (req, res) => {
        const page = req.params.page;
        const limit = 2;

        let offset = page > 1 ? (page * limit) - limit : 0;
        let totalRec = 0;
        let pageCount = 0;

        productModel.countProduct()
        .then((result) => {
            totalRec = result[0].rows;
            pageCount = Math.ceil(totalRec / limit);
            productModel.paginationProduct(limit, offset)
            .then((result) => {
                res.json({
                    page: parseInt(page),
                    offset: offset,
                    limit: parseInt(limit),
                    total: parseInt(totalRec),
                    totalPage: parseInt(pageCount),
                    next_page: page < pageCount ? 'http://localhost:3000/api/v1/product/pagination/'+ (parseInt(page) + 1) : null,
                    prev_page: page > 1 ? 'http://localhost:3000/api/v1/product/pagination/' + (page - 1) : null,
                    data: result
                })
            })
            .catch(err => console.log(err));
        })
    }
};