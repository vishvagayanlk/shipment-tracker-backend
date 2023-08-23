import { Request, Response } from "express";
import { logger } from "../../core/logger";
import trackingService from "../../services/tracking";
import { User } from "../../models/types/user";

const updateTrackingDetailsController = async (req: Request, res: Response) => {
  try {
    const { trackingDetailsId, status, description } = req.body;
    const currentUser: User | undefined = req.user;
    if (!currentUser) {
      return res.status(401).json({ message: "Authentication required" });
    }
    const updatedTracking = await trackingService.updateTrackingDetails({
      trackingDetailsId,
      status,
      description,
      userId: currentUser.id,
    });

    logger.info("Tracking details updated:", updatedTracking);
    return res.status(200).json(updatedTracking);
  } catch (error) {
    logger.error("Error updating tracking details:", error);
    return res.status(500).json({ message: "Error updating tracking details" });
  }
};

export default updateTrackingDetailsController;
