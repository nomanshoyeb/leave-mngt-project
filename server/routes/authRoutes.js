const express = require("express");
const { signup, login } = require("../controllers/authController");

const router = express.Router();
router.post("/signup", signup); // For creating new user
router.post("/login", login);   // For login existing user

module.exports = router;