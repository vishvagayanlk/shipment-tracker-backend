import express from "express";
import { loginSchema, signupSchema } from "../schema/auth.schema";
import inputValidationMiddleware from "../middleware/input-validation";
import controllers from "../controllers";
import authVerifyMiddleware from "../middleware/auth-verify";

const authRouter = express.Router();

authRouter.post(
  "/signup",
  inputValidationMiddleware(signupSchema),
  controllers.authController.signupController,
);

authRouter.post(
  "/login",
  inputValidationMiddleware(loginSchema),
  controllers.authController.loginController,
);

authRouter.post(
  "/logout",
  authVerifyMiddleware,
  controllers.authController.logoutController,
);

export default authRouter;
