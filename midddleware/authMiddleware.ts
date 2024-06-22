import userModel from "../models/usermodel";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "../server";
import { dbConnect } from "../config/dbconnect";

export const userVerification = async (req: any, res: any) => {
    const token = req.cookies.token
    console.log("token", token);
    if (!token) {
        return res.json({ status: false })
    }
    const result = verifyAccessToken(token);
    if (result.success) {
        let user = result.user as JwtPayload
        let email = user.email;
        await dbConnect();
        const userInfo = await userModel.findOne({ email });
        if (userInfo) {
            res.json({ status: true, user: (<any>userInfo).firstName });
            return
        }
        else return res.json({ status: false })
    } else {
        return res.json({ status: false, message: "error" })
    }
}