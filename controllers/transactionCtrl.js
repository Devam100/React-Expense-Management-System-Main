const transactionModel = require("../models/transactionModel");
const moment = require("moment");

const getAllTransaction = async (req, res) => {
  try {
    const { frequency, type } = req.body;
    const transactions = await transactionModel.find({
      ...(frequency !== "custom"
        ? {
            date: {
              $gt: moment().subtract(Number(frequency), "d").toDate(),
            },
          }
        : {}),
      userid: req.body.userid,
      ...(type !== "all" && { type }),
    });
    res.status(200).json(transactions);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const deleteTransaction = async (req, res) => {
  try {
    await transactionModel.findOneAndDelete({ _id: req.body.transactionId });
    res.status(200).send("Transaction Deleted!");
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const editTransaction = async (req, res) => {
  try {
    const updatedTransaction = await transactionModel.findOneAndUpdate(
      { _id: req.body.transactionId },
      req.body.payload,
      { new: true }
    );
    res.status(200).json(updatedTransaction);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
};

const addTransaction = async (req, res) => {
  try {
    const { amount, type, category, date, reference, description, userid } = req.body;

    // Validate fields
    if (!amount || !type || !category || !date || !reference || !description || !userid) {
      return res.status(400).json({ message: 'Please fill all fields' });
    }

    // Assuming you have a Transaction model
    const newTransaction = new transactionModel({
      amount, type, category, date, reference, description, userid
    });
    await newTransaction.save();

    res.status(201).json({ success: true, transaction: newTransaction });
  } catch (error) {
    console.error('Add Transaction Error:', error);
    res.status(500).json({ message: 'Internal Server Error' });
  }
};
const importTransactions = async (req, res) => {
  try {
    const { transactions, userid } = req.body;

    if (!Array.isArray(transactions) || !userid) {
      return res.status(400).json({ message: 'Invalid request data' });
    }

    for (const transaction of transactions) {
      // Validate transaction fields if necessary
      if (!transaction.amount || !transaction.type || !transaction.category || !transaction.reference || !transaction.description) {
        return res.status(400).json({ message: 'Invalid transaction data' });
      }

      // Save the transaction
      await transactionModel.create({ ...transaction, userid });
    }

    res.status(200).json({ message: 'Transactions imported successfully' });
  } catch (error) {
    console.error('Error importing transactions:', error); // Log the error for debugging
    res.status(500).json({ message: 'Error importing transactions' });
  }
};


module.exports = {
  getAllTransaction,
  addTransaction,
  editTransaction,
  deleteTransaction,
  importTransactions
};

//----------------------------🌸🌸🌸------------------------------
