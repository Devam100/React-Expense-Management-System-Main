const express = require("express");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const { User } = require("../models/userModel");
const { loginController, registerController, forgotPasswordController, resetPasswordController } = require("../controllers/userController");
const router = express.Router();

// Define your routes
router.post("/login", loginController);
router.post("/register", registerController);
router.post("/forgot-password", forgotPasswordController);
router.post("/reset-password/:token", resetPasswordController);



module.exports = router;

//----------------------------🌸🌸🌸------------------------------