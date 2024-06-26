import { Request, Response } from "express";
import { generateAccessToken } from "../utils/jwt";
import { dbConnect } from "../config/dbconnect";
import userModel from "../models/usermodel";
import bcrypt from "bcryptjs";

export const register = async (req: Request, res: Response) => {
    try {
        const { email, firstName, lastName, password } = req.body;
        await dbConnect();
        const userExixts = await userModel.findOne({ email });

        if (userExixts) {
            res.status(500).json({ message: "Account already exists, please login." });
            return;
        }

        const hashedPassword = await bcrypt.hash(password, 10);
        const newUser = new userModel({ email, firstName, lastName, password: hashedPassword });
        await newUser.save();

        const accessToken = generateAccessToken(email);
        res.cookie("token", accessToken, {
            httpOnly: false,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax'
        });

        res.status(200).json({ message: "User signed in successfully", success: true, newUser });
    } catch (error) {
        console.log("Error registering user", error);
        res.status(500).json({ message: `Error registering user ==> ${error}` });
    }
};

export const login = async (req: Request, res: Response) => {
    try {
        const { email, password } = req.body;
        await dbConnect();
        const user = await userModel.findOne({ email });

        if (!user) {
            return res.status(401).json({ message: 'Incorrect email' })
        }

        const auth = await bcrypt.compare(password, user.password)

        if (!auth) {
            return res.status(401).json({ message: 'Incorrect password' })
        }

        const token = generateAccessToken(email);
        res.cookie("token", token, {
            httpOnly: false,
            secure: process.env.NODE_ENV == "production",
            sameSite: 'lax'
        });

        res.status(201).json({ message: "User logged in successfully", success: true });
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: `Error registering user ==> ${error}` });
    }
}