import userModel from "../models/usermodel";
import { dbConnect } from "../config/dbconnect";

type UserInfo = {
    email: string;
    firstName: string;
    lastName: string;
    accountBalance: number;
}

export const userVerification = async (req: any, res: any) => {
    const email = req.user.email;
    if (email) {
        await dbConnect();
        const userInfo = await userModel.findOne({ email });
        if (userInfo) {
            const user: UserInfo = {
                email: userInfo.email,
                firstName: userInfo.firstName,
                lastName: userInfo.lastName,
                accountBalance: userInfo.accountBalance
            }
            res.json({ status: true, user: user });
            return
        }
    } else {
        return res.json({ status: false, message: "no user email" })
    }
}