const express = require("express");
const userController = require('../controller/users')
const router = express.Router()

router
    .get("/", userController.getAllUsers)
    .get("/:id", userController.getUser)
    .post("/", userController.addUser)
    .put('/:id', userController.replaceUser)
    .patch('/:id', userController.updateUser)
    .delete("/:id", userController.deleteUser);

exports.router = router