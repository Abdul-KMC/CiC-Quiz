const express = require("express");
const router = express.Router();
const decodeTokenController = require("../Controller/decodeTokenController");

console.log(decodeTokenController);
router.post("/decode", decodeTokenController);

module.exports = router;