const Product = require('../../model/product');
const { validationResult } = require('express-validator');

const create = async (req, res) => {
    const errors = validationResult(req);

    if(!errors.isEmpty())
        return res.status(403).json(errors);

    const {name, price, description} = req.body;
    const product = new Product({
        name, price, description
    });
    await product.save();
    return res.status(200).json({
        status: "success"
    });
};

const getProducts = async (req, res) => {
    const products = await Product.find();
    return res.status(200).json({
        products
    });
};

const deleteProduct = async (req, res) => {
    const product = await Product.deleteOne({ _id: req.params.id });
    return res.status(200).json({
        product
    });
};

const getProduct = async (req, res) => {
    const product = await Product.findOne({ _id: req.params.id });
    return res.status(200).json({
        product
    });
};

module.exports = {create, getProducts, deleteProduct, getProduct};