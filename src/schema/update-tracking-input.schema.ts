import { z } from "zod";
import { TrackingStatusEnum } from "../services/shipment/types";

const updateTrackingDetailsSchema = z
  .object({
    trackingDetailsId: z.string(),
    status: z.string().min(1).max(255).optional(),
    description: z.string().min(1).max(255).optional(),
  })
  .refine(
    (data) => {
      if (data.status) {
        return Object.values(TrackingStatusEnum).includes(
          data.status as TrackingStatusEnum,
        );
      }
      return true;
    },
    {
      message: "Invalid Tracking status value",
    },
  );

export default updateTrackingDetailsSchema;
