import userModel from "../models/usermodel";
import { dbConnect } from "../config/dbconnect";

type UserInfo = {
  email: string;
  firstName: string;
  lastName: string;
  accountBalance: number;
  bch: number;
  bnb: number;
  btc: number;
  eth: number;
  sol: number;
  trx: number;
  usdt: number;
};

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
        accountBalance: userInfo.accountBalance,
        bch: userInfo.bch,
        bnb: userInfo.bnb,
        btc: userInfo.btc,
        eth: userInfo.eth,
        sol: userInfo.sol,
        trx: userInfo.trx,
        usdt: userInfo.usdt,
      };
      res.json({ status: true, user: user });
    } else {
      res.status(404).json({ status: false, message: "User not found" });
    }
  } else {
    return res.json({ status: false, message: "no user email" });
  }
};
