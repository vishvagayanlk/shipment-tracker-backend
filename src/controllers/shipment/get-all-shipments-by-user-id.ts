import { Request, Response } from "express";
import { shipmentService } from "../../services";
import { User } from "../../models/types/user";

const getAllShipmentsByUserIdController = async (
  req: Request,
  res: Response,
) => {
  const currentUser: User | undefined = req.user;
  if (!currentUser) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const shipments = await shipmentService.getAllShipmentsByUserId(
      currentUser.id,
    );
    return res.status(200).json(shipments);
  } catch (error) {
    return res.status(500).json("Error While Fetching Shipments details");
  }
};

export default getAllShipmentsByUserIdController;
