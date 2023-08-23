import { Request, Response } from "express";
import { authService } from "../../services";
import { logger } from "../../core/logger";

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  try {
    const token = await authService.login({ email, password });
    res.status(200).json({ token });
  } catch (error) {
    logger.info("loins", error);
    res.status(401).json({ message: (error as Error).message });
  }
};

export default loginController;
