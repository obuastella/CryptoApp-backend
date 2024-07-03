import userModel from "../models/usermodel";
import { dbConnect } from "../config/dbconnect";

type UserInfo = {
  userId: string;
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

export const getUser = async (req: any, res: any) => {
  const authHeader = req.headers.authorization;
  if (authHeader) {
    const userId = authHeader.split('Bearer ')[1];
    if (userId) {
      await dbConnect();
      const userInfo = await userModel.findOne({ userId });
      if (userInfo) {
        const user: UserInfo = {
          userId: userInfo.userId,
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
  }
}
