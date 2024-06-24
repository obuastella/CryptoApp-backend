import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User'
    },
    date: {
        type: String,
        required: true,
    },
    type: {
        type: String,
        required: true
    },
    amount: {
        type: String,
        required: true
    },
    status: {
        type: String,
        required: true
    },
    currency: {
        type: String,
        required: true
    },
    externalWallet: {
        type: String,
    }
})

const transactionModel = mongoose.model("Transaction", transactionSchema);

export default transactionModel;