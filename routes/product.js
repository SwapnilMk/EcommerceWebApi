const express = require("express");
const productController = require('../controller/product')
const router = express.Router()

router
    .get("/products", productController.getAllProducts)
    .get("/products/:id", productController.getProduct)
    .post("/products", productController.addProduct)
    .put('/products/:id', productController.replaceProduct)
    .patch('/products/:id', productController.updateProduct)
    .delete("/products/:id", productController.deleteProduct);

exports.router = router