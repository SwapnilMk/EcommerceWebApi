// // const fs = require('fs')
// // const product = fs.readFileSync("./jsonData.json");
// // const data = JSON.parse(product);
// // const products= data.products 

// const model = require('../model/user')
// const User = model.User


// exports.addProduct = async (req, res) => {
//     // const newProduct = products.push(req.body)
//     // console.log(newProduct)
//     // res.json(newProduct)
//     const users = new User(req.body);
//     await users.save();
//     console.log(users);
//     res.send(req.body)
// }

// exports.getAllProducts = async (req, res) => {
//     const users = await User.find()
//     res.json(users)
// }

// exports.getProduct = async (req, res) => {
//     const id = +req.params.id
//     // const product = products.find(e => e.id == id)
//     const user = await User.findOne({ "id": id })
//     res.send(user)
// }

// exports.replaceProduct = async (req, res) => {
//     let id = +req.params.id;
//     // let index = products.findIndex(e => e.id == id);
//     // const updatedProduct = products.splice(index, 1, { ...req.body, id: id })
//     try {
//         const user = await User.findOneAndReplace({ 'id': id }, req.body, { new: true })
//         res.json(user)
//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.updateProduct = async (req, res) => {
//     let id = req.params.id;
//     // let index = products.findIndex(e => e.id == id);
//     // const product = products[index]
//     // const updatedProduct = products.splice(index, 1, { ...product, ...req.body, id: id })
//     try {
//         const user = await User.findOneAndUpdate({ 'id': id }, { new: true })
//         res.json(user)
//     } catch (err) {
//         console.log(err)
//     }
// }

// exports.deleteProduct = async (req, res) => {
//     const id = +req.params.id;
//     // let index = data.findIndex((e) => e.id == id);
//     // const deleteProduct = data.splice(index, 1);
//     try {
//         const user = await User.findOneAndDelete({ 'id': id })
//         res.json(user);
//     } catch (err) {
//         console.log(err)
//     }
// }
