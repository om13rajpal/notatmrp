import { NextFunction, Request, Response } from "express";
import { verify } from "jsonwebtoken";
import { JWT_SECRET } from "../config/env.config";

export async function authenticateUser(
  req: Request,
  res: Response,
  next: NextFunction
) {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    res.status(401).json({ success: false, message: "Unauthorized" });
    return;
  }
  try {
    const decoded = verify(token, JWT_SECRET);
    if (!decoded) {
      res.status(401).json({ success: false, message: "Unauthorized" });
      return;
    }
    next();
  } catch (error: any) {
    res
      .status(401)
      .json({ success: false, message: "Unauthorized", error: error.message });
  }
}
