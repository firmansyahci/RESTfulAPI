const categoryModel = require('../models/category');
const miscHelper = require('../helpers/helpers');

module.exports = {
    getCategory: (req, res) => {
        categoryModel.getCategory()
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    categoryDetail: (req, res) => {
        const id = req.params.id;
        categoryModel.categoryDetail(id)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    insertCategory: (req, res) => {
        const {name, description} = req.body;
        const data = {
            name,
            description
        };
        categoryModel.insertCategory(data)
        .then((result) => {
            miscHelper.response(res, result, 201);
        })
        .catch(err => console.log(err));
    },
    updateCategory: (req, res) => {
        const {name, description} = req.body;
        const data = {
            name,
            description
        };
        const id = req.params.id;
        categoryModel.updateCategory(data, id)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    deleteCategory: (req, res) => {
        const id = req.params.id;
        categoryModel.deleteCategory(id)
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    }
};