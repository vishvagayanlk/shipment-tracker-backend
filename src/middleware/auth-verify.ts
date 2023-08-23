import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/types/user";
import { logger } from "../core/logger";
import isUserHasActiveJwt from "../utils/is-user-has-active-token";

const authVerifyMiddleware = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  try {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ message: "Authentication token missing" });
    }
    const token = authorization.split(" ")[1];
    if (!token) {
      return res.status(401).json({ message: "Invalid token" });
    }
    const decodedToken = jwt.verify(token, process.env.SECRET_KEY) as User;
    if (!(await isUserHasActiveJwt(decodedToken.id))) {
      return res
        .status(401)
        .json({ message: "Access forbidden: Inactive user or expired token" });
    }
    req.user = decodedToken;
    next();
  } catch (error) {
    logger.error(error);
    res.status(401).json({ message: "Authentication failed" });
  }
};

export default authVerifyMiddleware;
