const userModel = require('../models/user');
const miscHelper = require('../helpers/helpers');
const passwordHash = require('password-hash');
const jwt = require('jsonwebtoken');

module.exports = {
    getUser: (req, res) => {
        userModel.getUser()
        .then((result) => {
            miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    },
    insertUser: (req, res) => {
        const {email, password} = req.body;
        const data = {
            email,
            password: passwordHash.generate(password)
        };
        userModel.insertUser(data)
        .then((result) => {
            miscHelper.response(res, result, 201);
        })
        .catch(err => console.log(err));
    },
    loginUser: (req, res) => {
        const email = req.body.email;
        const pass = req.body.password;
        userModel.loginUser(email, pass)
        .then((result) => {
            if (passwordHash.verify(pass, result[0].password)) {
                const token = jwt.sign(
                    {
                        email: result[0].email,
                        userId: result[0].id
                    },
                    process.env.JWT_KEY,
                    {
                        expiresIn: "1h"
                    }
                );
                res.status(200).json({
                    message: 'Login Succesful',
                    token: token
                });
            }
            // miscHelper.response(res, result, 200);
        })
        .catch(err => console.log(err));
    }
};