import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
  userId: {
    type: String,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  type: {
    type: String,
    required: true,
  },
  amount: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    required: true,
  },
  currency: {
    type: String,
    required: true,
  },
  externalWallet: {
    type: String,
  },
  duration: {
    type: String, // Example: duration in days or months
  },
});

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;
