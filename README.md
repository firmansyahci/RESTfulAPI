# RESTfulAPI
ExpressJS Mysql, Shopping Cart

Clone this repository
https://github.com/firmansyahci/RESTfulAPI.git

Install dependencies
npm install --save express mysql body-parser dotenv jsonwebtoken multer morgan password-hash cors eslint

Start NodeJS server at http://localhost:3000
npm start

Using Postman

-- Product --
Add product
POST http://localhost:3000/api/v1/product/

List product
GET http://localhost:3000/api/v1/product/

-- User --
Sign up
POST http://localhost:3000/api/v1/user/signup

Login
POST http://localhost:3000/api/v1/user/login

-- Cart --
Add Product to cart
POST http://localhost:3000/api/v1/cart/

Checkout
POST http://localhost:3000/api/v1/cart/checkout
