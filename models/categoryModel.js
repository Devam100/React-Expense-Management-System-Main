// server/models/categoryModel.js
const mongoose = require("mongoose");

const categorySchema = new mongoose.Schema({
  type: {
    type: String,
    required: true,
    enum: ["income", "expense"],
  },
  name: {
    type: String,
    required: true,
  },
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
});

const Category = mongoose.model("Category", categorySchema);
module.exports = Category;
