
const Product = require('../models/product');

const getAllProducts = async (req, res) => {
    try {
        const Products = await Product.find()
        res.status(200).json(Products)
    } catch (error) {
        res.status(500).json({ message: `error while fetching products ${error}` })
    }
}



module.exports = {getAllProducts}