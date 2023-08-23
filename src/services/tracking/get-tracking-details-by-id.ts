import { Types } from "mongoose";
import Tracking from "../../models/Tracking";

const getTrackingDetailsByTrackingId = async (trackingDetailsId: string) => {
  const trackingId = new Types.ObjectId(trackingDetailsId);
  const trackingDetails = await Tracking.findOne({
    "trackingDetails._id": trackingId,
  });
  if (!trackingDetails) {
    throw new Error("Tracking details not found");
  }
  const { status, description, trackingCode } = trackingDetails;
  const trackingInfo = {
    status,
    description,
    trackingCode,
    trackingDetailsId,
  };

  return trackingInfo;
};
export default getTrackingDetailsByTrackingId;
