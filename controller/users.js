const fs = require('fs')
const user = fs.readFileSync("./jsonData.json");
const data = JSON.parse(user);
const users= data.users

exports.getAllUsers = (req, res) => {
    res.json(users)
}

exports.getUser = (req, res) => {
    const id = req.params.id
    const user = users.find(e => e.id == id)
    res.send(user)
}

exports.addUser = (req, res) => {
    const newUser = users.push(req.body)
    console.log(newUser)
    res.json(newUser)
}

exports.replaceUser = (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(e => e.id == id);
    const updatedUser = users.splice(index, 1, { ...req.body, id: id })
    res.json(updatedUser)
}

exports.updateUser = (req, res) => {
    let id = req.params.id;
    let index = users.findIndex(e => e.id == id);
    const user = users[index]
    const updatedUser = users.splice(index, 1, { ...product, ...req.body, id: id })
    res.json(updatedUser)
}

exports.deleteUser = (req, res) => {
    const id = req.params.id;
    let index = data.findIndex((e) => e.id == id);
    const deleteUser = data.splice(index, 1);
    res.json(deleteUser);
}
