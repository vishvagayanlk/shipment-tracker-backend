import { logger } from "../../core/logger";
import Tracking from "../../models/Tracking";
import User from "../../models/User";

const getTrackingDetailsByTrackingCode = async (trackingCode: string) => {
  logger.info("tracking fun 2", { trackingCode });
  const trackingDetails = await Tracking.findOne({
    trackingCode: trackingCode,
  });
  if (!trackingDetails) {
    throw new Error("Tracking details not found");
  }
  const user = await User.findById(trackingDetails.createdBy);
  const { status, description } = trackingDetails;
  const trackingInfo = {
    status,
    description,
    userName: user?.name || "Not available",
  };

  return trackingInfo;
};
export default getTrackingDetailsByTrackingCode;
