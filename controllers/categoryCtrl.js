// server/controllers/categoryCtrl.js
const Category = require("../models/categoryModel");


const createCategory = async (req, res) => {
  try {
    const { type, name, userId } = req.body;
    const category = new Category({ type, name, userId });
    await category.save();
    res.status(201).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error creating category", error });
  }
};

const updateCategory = async (req, res) => {
  try {
    const { id } = req.params;
    const { type, name } = req.body;
    const category = await Category.findByIdAndUpdate(
      id,
      { type, name },
      { new: true }
    );
    res.status(200).json(category);
  } catch (error) {
    res.status(500).json({ message: "Error updating category", error });
  }
};

const deleteCategory = async (req, res) => {
  try {
    const { id } = req.params;
    await Category.findByIdAndDelete(id);
    res.status(200).json({ message: "Category deleted" });
  } catch (error) {
    res.status(500).json({ message: "Error deleting category", error });
  }
};

const getCategories = async (req, res) => {
  try {
    const { userId } = req.body;
    const categories = await Category.find({ userId });
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ message: "Error fetching categories", error });
  }
};

module.exports = {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
};
