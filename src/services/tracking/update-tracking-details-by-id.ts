import Tracking from "../../models/Tracking";
import { ITracking } from "../../models/types/tracking";

interface UpdateTrackingDetailsParams {
  trackingDetailsId: string;
  status: string;
  description: string;
  userId: string;
}

const updateTrackingDetailsService = async ({
  trackingDetailsId,
  status,
  description,
  userId,
}: UpdateTrackingDetailsParams): Promise<ITracking | null> => {
  try {
    const updatedTrackingDetails = await Tracking.findByIdAndUpdate(
      trackingDetailsId,
      {
        status,
        description,
        updatedBy: userId,
      },
      { new: true },
    );

    return updatedTrackingDetails;
  } catch (error) {
    throw new Error("Error updating tracking details");
  }
};

export default updateTrackingDetailsService;
