const express = require("express");
const app = express();
const dotenv = require("dotenv").config();
const port = process.env.PORT;
const productController = require('./controller/product')

app.use(express.json());



app.get("/products", productController.getAllProducts)
    .get("/products/:id", productController.getProduct)
    .post("/products", productController.addProduct)
    .put('/products/:id', productController.replaceProduct)
    .patch('/products/:id', productController.updateProduct)
    .delete("/products/:id", productController.deleteProduct);




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
