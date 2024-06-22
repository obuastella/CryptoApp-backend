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
            const user = {
                email: (<any>userInfo).email,
                firstName: (<any>userInfo).firstName,
                lastName: (<any>userInfo).lastName
            }
            res.json({ status: true, user: user });
            return
        }
        else return res.json({ status: false })
    } else {
        return res.json({ status: false, message: "error" })
    }
}