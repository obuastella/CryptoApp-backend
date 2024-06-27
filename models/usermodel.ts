import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    email: {
        type: String,
        required: true,
        unique: true
    },
    firstName: {
        type: String,
        required: true
    },
    lastName: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    accountBalance: {
        type: Number,
        default: 0
    },
    wallet: {
        type: Number,
        default: 0
    }
})

const userModel = mongoose.model("User", userSchema);

export default userModel;