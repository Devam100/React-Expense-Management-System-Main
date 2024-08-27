//userController.js
const userModel = require("../models/userModel");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const nodemailer = require("nodemailer");
const express = require("express");
const router = express.Router();

// Register Callback
const registerController = async (req, res) => {
  try {
    const { password, ...rest } = req.body;
    const existingUser = await userModel.findOne({ email: rest.email });
    if (existingUser) {
      return res.status(409).json({
        success: false,
        message: "User already exists...!",
      });
    }
    const hashedPassword = await bcrypt.hash(password, 10);
    const newUser = new userModel({ ...rest, password: hashedPassword });
    await newUser.save();
    res.status(201).json({
      success: true,
      newUser,
    });
  } catch (error) {
    res.status(400).json({
      success: false,
      error,
    });
  }
};

// Login Callback
const loginController = async (req, res) => {
  try {
    const { email, password } = req.body;
    
    // Check if both email and password are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Find the user by email
    const user = await userModel.findOne({ email });
    
    // Check if user exists
    if (!user) {
      return res.status(404).json({ message: 'User not registered, please register...!' });
    }

    // Compare provided password with stored hash
    const isMatch = await bcrypt.compare(password, user.password);
    
    // Check if password matches
    if (!isMatch) {
      return res.status(400).json({ message: 'Password is wrong' });
    }

    // Send success response with user data
    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error('Login Error:', error); // Log error details
    res.status(500).json({ message: 'Internal Server Error' });
  }
};

// Forgot Password Controller
const forgotPasswordController = async (req, res) => {
  const { email } = req.body;
  try {
    const user = await userModel.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: "Email is not registered..." });
    }
  
    const token = jwt.sign({ id: user._id }, process.env.KEY, {
      expiresIn: "5m",
    });

    var transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS,
      },
    });

    const encodedToken = encodeURIComponent(token).replace(/\./g, "%2E");
    var mailOptions = {
      from: process.env.EMAIL_USER,
      to: email,
      subject: "Reset Password",
      text: `http://localhost:3000/resetPassword/${encodedToken}`,
    };

    transporter.sendMail(mailOptions, function (error, info) {
      if (error) {
        return res.status(500).json({ message: "Error occurs sending email" });
      } else {
        return res.status(200).json({ status: true, message: "Email Sent" });
      }
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: "Server error" });
  }
};

// Reset Password Controller
// const resetPasswordController = async (req, res) => {
//   try {
//     const { token } = req.params;
//     const { password } = req.body;

//     if (!password) {
//       return res.status(400).json({ success: false, message: "Password is required" });
//     }

//     const decoded = jwt.verify(token, process.env.KEY);
//     const user = await userModel.findById(decoded.id);
//     if (!user) {
//       return res.status(404).json({ success: false, message: "Invalid token or user not found" });
//     }

//     const hashedPassword = await bcrypt.hash(password, 10);
//     user.password = hashedPassword;
//     await user.save();

//     res.status(200).json({ success: true, message: "Password reset successful" });
//   } catch (error) {
//     res.status(400).json({
//       success: false,
//       error: error.message,
//     });
//   }
// };
// Reset Password Controller
const resetPasswordController = async (req, res) => {
  try {
    const { token } = req.params;
    const { password } = req.body;

    if (!password) {
      return res.status(400).json({ success: false, message: "Password is required" });
    }

    const decoded = jwt.verify(token, process.env.KEY);
    const user = await userModel.findById(decoded.id);
    if (!user) {
      return res.status(404).json({ success: false, message: "Invalid token or user not found" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    user.password = hashedPassword;
    await user.save();

    res.status(200).json({ success: true, message: "Password reset successful" });
  } catch (error) {
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

module.exports = router;
module.exports = { loginController, registerController, forgotPasswordController, resetPasswordController };

//----------------------------🌸🌸🌸------------------------------