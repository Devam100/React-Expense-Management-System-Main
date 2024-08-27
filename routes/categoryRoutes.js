// server/routes/categoryRoutes.js
const express = require("express");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategories,
} = require("../controllers/categoryCtrl");
const router = express.Router();

router.post("/create-category", createCategory);
router.put("/update-category/:id", updateCategory);
router.delete("/delete-category/:id", deleteCategory);
router.post("/get-categories", getCategories);

module.exports = router;
