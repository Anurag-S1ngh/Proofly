import { NextFunction, Response } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import { CustomExpressRequest } from "../util/util";

export function Authentication(
  req: CustomExpressRequest,
  res: Response,
  next: NextFunction,
) {
  const token = req.headers.authorization;
  if (!token) {
    res.status(401).json({
      msg: "sign up first",
    });
    return;
  }
  const decodedData = jwt.verify(token, process.env.JWT_SECRET!) as JwtPayload;
  if (!decodedData.userId) {
    res.status(401).json({
      msg: "sign up first",
    });
    return;
  }
  req.userId = decodedData.userId;
  next();
  return;
}
