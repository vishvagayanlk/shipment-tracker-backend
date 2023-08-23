import { logger } from "../../core/logger";
import { trackingService } from "../../services";

import { Request, Response } from "express";
const getTrackingDetailsByCodeController = async (
  req: Request,
  res: Response,
) => {
  const trackingCode = req.query.trackingCode as string;
  logger.info(trackingCode);
  if (!trackingCode) {
    return res.status(400).json({ message: "Missing trackingCode parameter" });
  }
  try {
    const trackingDetails =
      await trackingService.getTrackingDetailsByTrackingCode(trackingCode);
    return res.status(200).json(trackingDetails);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While fetching tracking details" });
  }
};

export default getTrackingDetailsByCodeController;
