import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "../server";

export const verifyToken = (req: any, res: any, next: any) => {
  const token = req.cookies.token;
  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }
  const result = verifyAccessToken(token);
  if (result.success) {
    let user = result.user as JwtPayload;
    req.user = user;
    next();
  } else {
    return res.status(403).json({ status: false, message: "Invalid token" });
  }
};
