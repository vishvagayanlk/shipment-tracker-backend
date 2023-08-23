import { Request, Response } from "express";
import { shipmentService } from "../../services";
import { User } from "../../models/types/user";

const createShipmentController = async (req: Request, res: Response) => {
  const {
    senderName,
    senderAddress,
    recipientName,
    recipientAddress,
    description,
  } = req.body;
  const currentUser: User | undefined = req.user;
  if (!currentUser) {
    return res.status(401).json({ message: "Authentication required" });
  }
  try {
    const shipment = await shipmentService.createShipment({
      senderName,
      senderAddress,
      recipientName,
      recipientAddress,
      description,
      userId: currentUser.id,
    });
    return res.status(200).json(shipment);
  } catch (error) {
    return res.status(501).json("shipment creation error");
  }
};

export default createShipmentController;
