const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const fs = require("fs");

app.use(express.json());

const product = fs.readFileSync("./jsonData.json");
const products = JSON.parse(product);


const getProducts = (req, res) => {
    res.json(products)
}
const getProduct = (req, res) => {
    const id = req.params.id
    const product = products.find(e => e.id == id)
    res.send(product)
}

const addProduct = (req, res) => {
    const newProduct = products.push(req.body)
    console.log(newProduct)
    res.json(newProduct)
}
const replaceProduct = (req, res) => {
    let id = req.params.id;
    let index = products.findIndex(e => e.id == id);
    const updatedProduct = products.splice(index, 1, { ...req.body, id: id })
    res.json(updatedProduct)
}

const updateProduct = (req, res) => {
    let id = req.params.id;
    let index = products.findIndex(e => e.id == id);
    const product = products[index]
    const updatedProduct = products.splice(index, 1, { ...product, ...req.body, id: id })
    res.json(updatedProduct)
}


const deleteProduct = (req, res) => {
    const id = req.params.id;
    let index = data.findIndex((e) => e.id == id);
    const deleteProduct = data.splice(index, 1);
    res.json(deleteProduct);
}



app.get("/products", getProducts)
    .get("/products/:id", getProduct)
    .post("/products", addProduct)
    .put('/products/:id', replaceProduct)
    .patch('/products/:id', updateProduct)
    .delete("/products/:id", deleteProduct);




// middleware 
// const auth = (req, res, next) => {
//     if (req.body.password === "123") {
//         next();
//     } else {
//         res.send("noo bro");
//     }
// };

// const products = async () => {
//     const response = await fetch('https://dummyjson.com/products');
//     const data = await response.json()
//     return data.products
// }

// const addProducts = async () => {
//     const response = await fetch('https://dummyjson.com/products/add')
//     const data = await response.json()
//     console.log(data)
// }





// app.post("/products", async (req, res) => {
// fetch('https://dummyjson.com/products/add', {
//     method: 'POST',
//     headers: { 'Content-Type': 'application/json' },
//     body: JSON.stringify(req.body)
// })
//     .then(response => response.json())
//     .then(data => {
//         console.log(data);
//         res.send('added!');
//     })
// });







app.listen(port, () => {
    console.log(`server is running on http://localhost:${port}`);
});
