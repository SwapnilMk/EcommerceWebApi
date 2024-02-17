const fs = require('fs')

const product = fs.readFileSync("./jsonData.json");
const products = JSON.parse(product);

exports.getAllProducts = (req, res) => {
    res.json(products)
}

exports.getProduct = (req, res) => {
    const id = req.params.id
    const product = products.find(e => e.id == id)
    res.send(product)
}

exports.addProduct = (req, res) => {
    const newProduct = products.push(req.body)
    console.log(newProduct)
    res.json(newProduct)
}

exports.replaceProduct = (req, res) => {
    let id = req.params.id;
    let index = products.findIndex(e => e.id == id);
    const updatedProduct = products.splice(index, 1, { ...req.body, id: id })
    res.json(updatedProduct)
}

exports.updateProduct = (req, res) => {
    let id = req.params.id;
    let index = products.findIndex(e => e.id == id);
    const product = products[index]
    const updatedProduct = products.splice(index, 1, { ...product, ...req.body, id: id })
    res.json(updatedProduct)
}


exports.deleteProduct = (req, res) => {
    const id = req.params.id;
    let index = data.findIndex((e) => e.id == id);
    const deleteProduct = data.splice(index, 1);
    res.json(deleteProduct);
}
