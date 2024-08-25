import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { UserModel } from "../models/userModel";
import { UserPreferenceModel, UserPreference } from "../models/UserPreference";

export const auth = async (req: Request, res: Response, next: NextFunction) => {
  const token = req.header("Authorization")?.replace("Bearer ", "");
  if (!token) {
    req.user = undefined;
    return next(); // Continue without setting user
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as {
      _id: string;
    };
    const user = await UserModel.findById(decoded._id);
    if (user) {
      const userPreferences = await UserPreferenceModel.findOne({
        email: user.email,
      });
      req.user = {
        _id: user._id,
        name: user.name,
        email: user.email,
        isAdmin: user.isAdmin,
        token: token,
        preferences: userPreferences as UserPreference | null,
      };
    } else {
      req.user = undefined;
    }
    next();
  } catch (error) {
    console.error("Authentication error:", error);
    req.user = undefined;
    next(); // Continue without setting user if token is invalid
  }
};
