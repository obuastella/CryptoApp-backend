import { Request, Response } from "express";
import { dbConnect } from "../config/dbconnect";
import userModel from "../models/usermodel";
import { sendWelcomeEmail } from "../utils/emailService";

export const register = async (req: Request, res: Response) => {
  try {
    const { email, firstName, lastName, userId } = req.body;
    await dbConnect();
    const userExists = await userModel.findOne({ email });

    if (userExists) {
      res
        .status(500)
        .json({ message: "Account already exists, please login." });
      return;
    }
    const newUser = new userModel({
      email,
      firstName,
      lastName,
      userId,
    });
    await newUser.save();

    const welcomeEmailDetails = { email, firstName };
    sendWelcomeEmail(welcomeEmailDetails);

    res.status(200).json({ message: "User signed in successfully", success: true, newUser });
  } catch (error) {
    console.log("Error registering user", error);
    res.status(500).json({ message: `Error registering user ==> ${error}` });
  }
};