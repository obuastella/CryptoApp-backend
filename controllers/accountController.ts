import { dbConnect } from "../config/dbconnect";
import userModel from "../models/usermodel";
import transactionModel from "../models/transaction";
import { sendTransactionEmail } from "../utils/emailService";

export const deposit = async (req: any, res: any) => {
  try {
    const { date, type, amount, status, currency, userId } = req.body;

    await dbConnect();
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new transactionModel({
      userId,
      date,
      type,
      amount,
      status,
      currency,
    });
    await newTransaction.save();

    await sendTransactionEmail(newTransaction, user);

    res.status(201).json({
      message: "Transaction created successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error creating transaction:", error);
    res.status(500).json({ message: "Error creating transaction" });
  }
};

export const getTransactions = async (req: any, res: any) => {
  try {
    const authHeader = req.headers.authorization;
    if (authHeader) {
      const userId = authHeader.split('Bearer ')[1];
      if (userId) {
        const user = await userModel.findOne({ userId });

        if (!user) {
          return res.status(404).json({ message: "User not found" });
        }

        const transactions = await transactionModel.find({ userId });
        res.status(200).json(transactions);
      }
    }
  } catch (error) {
    console.log("Error fetching user transactions:", error);
    res.status(500).json({ message: "Error fetching transactions" });
  }
};

export const withdraw = async (req: any, res: any) => {
  try {
    const { date, type, amount, status, currency, externalWallet, userId } = req.body;

    await dbConnect();
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new transactionModel({
      userId,
      date,
      type,
      amount,
      status,
      currency,
      externalWallet,
    });
    await newTransaction.save();

    await sendTransactionEmail(newTransaction, user);

    res.status(201).json({
      message: "Withdrawal processed successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error processing withdrawal:", error);
    res.status(500).json({ message: "Error processing withdrawal" });
  }
};

export const stake = async (req: any, res: any) => {
  try {
    const { date, type, amount, status, currency, duration, userId } = req.body;

    await dbConnect();
    const user = await userModel.findOne({ userId });
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    const newTransaction = new transactionModel({
      userId,
      date,
      type,
      amount,
      status,
      currency,
      duration,
    });
    await newTransaction.save();

    await sendTransactionEmail(newTransaction, user);

    res.status(201).json({
      message: "Stake processed successfully",
      transaction: newTransaction,
    });
  } catch (error) {
    console.error("Error processing stake:", error);
    res.status(500).json({ message: "Error processing stake" });
  }
};
