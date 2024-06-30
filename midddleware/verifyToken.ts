// import { verifyAccessToken } from "../utils/jwt";
// import { JwtPayload } from "../server";

// export const verifyToken = (req: any, res: any, next: any) => {
//   const token = req.cookies.token;
//   if (!token) {
//     return res.json({ status: false, message: "No token provided" });
//   }
//   const result = verifyAccessToken(token);
//   if (result.success) {
//     let user = result.user as JwtPayload;
//     req.user = user;
//     next();
//   } else {
//     return res.json({ status: false, message: "error with token" });
//   }
// };
import { Request, Response, NextFunction } from "express";
import { verifyAccessToken } from "../utils/jwt";
import { JwtPayload } from "../server";

declare global {
  namespace Express {
    interface Request {
      user?: JwtPayload;
    }
  }
}

export const verifyToken = (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const token = req.cookies.token || req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res
      .status(401)
      .json({ status: false, message: "No token provided" });
  }

  const result = verifyAccessToken(token);

  if (result.success) {
    const user = result.user as JwtPayload;
    req.user = user;
    next();
  } else {
    return res
      .status(401)
      .json({ status: false, message: "Invalid or expired token" });
  }
};
