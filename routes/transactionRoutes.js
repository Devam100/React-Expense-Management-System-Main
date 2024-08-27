const express = require("express");

const {
  addTransaction,
  getAllTransaction,
  editTransaction,
  deleteTransaction,
  importTransactions
} = require("../controllers/transactionCtrl");

//router object
const router = express.Router();

//routes

router.post("/add-transaction", addTransaction);
router.post("/edit-transaction", editTransaction);
router.post("/delete-transaction", deleteTransaction);
router.post("/get-transaction", getAllTransaction);
router.post('/import-transactions',importTransactions);


module.exports = router;

//----------------------------🌸🌸🌸------------------------------