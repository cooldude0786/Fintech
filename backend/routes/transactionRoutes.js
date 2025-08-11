// routes/transactions.js
const express = require("express");
const Transaction = require("../models/Transaction"); // Make sure .js extension isn't needed in CommonJS
const authMiddleware = require("../middleware/auth");

const router = express.Router();

// POST /api/transactions - Add a transaction
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, amount, type, description } = req.body;

    if (!title || !amount || !type) {
      return res.status(400).json({ message: "Please fill all required fields" });
    }
    // console.log("sdfs",req.user)
    const transaction = new Transaction({
      userId: req.user.userId,
      title,
      amount,
      type,
      description,
    });

    const savedTransaction = await transaction.save();
    res.status(201).json(savedTransaction);
  } catch (err) {
    console.error("Error saving transaction:", err);
    res.status(500).json({ message: "Server error" });
  }
});

// GET /api/transactions - Get all transactions for logged-in user
router.get("/", authMiddleware, async (req, res) => {
  try {
    console.log('callled get')
    const transactions = await Transaction.find({ userId: req.user.userId }).sort({ createdAt: -1 });
    res.json(transactions);
  } catch (err) {
    console.error("Error fetching transactions:", err);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;
