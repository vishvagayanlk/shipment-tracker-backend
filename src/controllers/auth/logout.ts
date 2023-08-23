import { Request, Response } from "express";
import { authService } from "../../services";
import { User } from "../../models/types/user";

const logoutController = async (req: Request, res: Response) => {
  const currentUser: User | undefined = req.user;
  if (!currentUser) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    await authService.logout(currentUser.id);
    res.clearCookie("token");
    res.status(200).json({ message: "Logged out successfully" });
  } catch (error) {
    res.status(401).json({ message: error });
  }
};

export default logoutController;
