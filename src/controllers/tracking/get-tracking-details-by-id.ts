import { trackingService } from "../../services";

import { Request, Response } from "express";
const getTrackingDetailsByIdController = async (
  req: Request,
  res: Response,
) => {
  const trackingId = req.params.trackingId;
  try {
    const trackingDetails =
      await trackingService.getTrackingDetailsByTrackingId(trackingId);
    return res.status(200).json(trackingDetails);
  } catch (error) {
    return res
      .status(500)
      .json({ message: "Error While fetching tracking details by id" });
  }
};

export default getTrackingDetailsByIdController;
