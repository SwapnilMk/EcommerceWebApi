// const fs = require('fs')
// const product = fs.readFileSync("./jsonData.json");
// const data = JSON.parse(product);
// const products= data.products 

const model = require('../model/product')
const Product = model.Product


exports.addProduct = async (req, res) => {
    // const newProduct = products.push(req.body)
    // console.log(newProduct)
    // res.json(newProduct)
    const product = new Product(req.body);
    await product.save();
    console.log(product);
    res.send(req.body)
}

exports.getAllProducts = async (req, res) => {
    const products = await Product.find()
    res.json(products)
}

exports.getProduct = async (req, res) => {
    const id = +req.params.id
    // const product = products.find(e => e.id == id)
    const product = await Product.findOne({ "id": id })
    res.send(product)
}

exports.replaceProduct = async (req, res) => {
    let id = +req.params.id;
    // let index = products.findIndex(e => e.id == id);
    // const updatedProduct = products.splice(index, 1, { ...req.body, id: id })
    try {
        const product = await Product.findOneAndReplace({ 'id': id }, req.body, { new: true })
        res.json(product)
    } catch (err) {
        console.log(err)
    }
}

exports.updateProduct = async (req, res) => {
    let id = req.params.id;
    // let index = products.findIndex(e => e.id == id);
    // const product = products[index]
    // const updatedProduct = products.splice(index, 1, { ...product, ...req.body, id: id })
    try {
        const product = await Product.findOneAndUpdate({ 'id': id }, { 'price': 999 }, { new: true })
        res.json(product)
    } catch (err) {
        console.log(err)
    }
}

exports.deleteProduct = async (req, res) => {
    const id = +req.params.id;
    // let index = data.findIndex((e) => e.id == id);
    // const deleteProduct = data.splice(index, 1);
    try {
        const product = await Product.findOneAndDelete({ 'id': id })
        res.json(product);
    } catch (err) {
        console.log(err)
    }
}
