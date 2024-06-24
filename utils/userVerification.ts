import userModel from "../models/usermodel";
import { dbConnect } from "../config/dbconnect";

export const userVerification = async (req: any, res: any) => {
    const email = req.user.email;
    if (email) {
        await dbConnect();
        const userInfo = await userModel.findOne({ email });
        if (userInfo) {
            const user = {
                email: (<any>userInfo).email,
                firstName: (<any>userInfo).firstName,
                lastName: (<any>userInfo).lastName,
                accountBalance: (<any>userInfo).accountBalance
            }
            res.json({ status: true, user: user });
            return
        }
    } else {
        return res.json({ status: false, message: "no user email" })
    }
}