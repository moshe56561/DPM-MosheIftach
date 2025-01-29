import jwt from "jsonwebtoken";
import { NextFunction, Request, Response } from "express";
import { IUser } from "../models/User";

const JWT_SECRET = process.env.JWT_SECRET || "your_jwt_secret";

export const authenticateJWT = (
  req: any,
  res: Response,
  next: NextFunction
) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    return res.status(401).json({ message: "Authorization token is missing" });
  }

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    req.user = decoded as IUser; // Attach the decoded user data to the request object
    next(); // Proceed to the next route handler
  } catch (error) {
    return res.status(403).json({ message: "Invalid or expired token" });
  }
};
