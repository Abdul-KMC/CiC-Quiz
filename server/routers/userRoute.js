const express = require('express');
const router = express.Router();
const { getUser, logIn, registerUser } = require('../Controller/userController.js');

router.post("/register", registerUser);
router.post("/login", logIn);
router.get("/getUser/:userId", getUser);

module.exports = router;