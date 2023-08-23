import { Request, Response } from "express";
import { authService } from "../../services";

// Signup Controller
const signupController = async (req: Request, res: Response) => {
  const { name, email, password, role } = req.body;
  try {
    const token = await authService.signup({ name, email, password, role });
    res.status(200).json({ token });
  } catch (error) {
    res.status(500).json({ message: error });
  }
};

export default signupController;
