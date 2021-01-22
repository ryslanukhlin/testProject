//rest full api product
const Router = require('express').Router();
const productController = require('../controller/product/ProductController');
const { body } = require('express-validator');

Router.post('/products',
    body('name', 'name error').notEmpty().isString(),
    body('price', 'name error').notEmpty().isNumeric(),
    body('description', 'name error').notEmpty().isString()
, productController.create);

Router.get('/products', productController.getProducts);
Router.delete('/products/:id', productController.deleteProduct);
Router.get('/products/:id', productController.getProduct);

module.exports = Router;