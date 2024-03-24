const express = require('express');
const router = express.Router();
const { getUser, logIn, registerUser, deleteUser } = require('../Controller/userController.js');

router.post("/register", registerUser);
router.delete("/register/:id", deleteUser)
router.post("/login", logIn);
router.get("/getUser/:userId", getUser);

module.exports = router;