import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  password: {
    type: String,
    required: true,
  },
  accountBalance: {
    type: Number,
    default: 0,
  },
  wallet: {
    type: Number,
    default: 0,
  },
  bch: {
    type: Number,
    default: 0,
  },
  bnb: {
    type: Number,
    default: 0,
  },
  btc: {
    type: Number,
    default: 0,
  },
  eth: {
    type: Number,
    default: 0,
  },
  sol: {
    type: Number,
    default: 0,
  },
  trx: {
    type: Number,
    default: 0,
  },
  usdt: {
    type: Number,
    default: 0,
  },
});

const userModel = mongoose.model("User", userSchema);

export default userModel;
