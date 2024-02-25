const express = require("express");
const app = express()
const dotenv = require("dotenv").config();
const cors = require('cors')
const mongoose = require('mongoose')
const port = process.env.PORT || 8080;
const path = require('path')
const bodyParser = require('body-parser')
const productRouter = require('./routes/product')
const userRouter = require('./routes/user')



main().catch(err => console.log(err));

async function main() {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("database connected!")
}   



app.use(bodyParser.urlencoded({extended: true}));
app.use(bodyParser.json());
app.use(cors())
app.use(express.json());
app.use(express.static(path.resolve(__dirname, process.env.PUBLIC_DIR)))
app.use('/api/products', productRouter.router)
app.use('/api/users', userRouter.router)
app.use('*', (req, res)=>{
    res.sendFile(path.resolve(__dirname, 'public' , 'index.html'))
})






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
