import { Types } from "mongoose";
import Shipment from "../../models/Shipment";

const getAllShipmentsByUserId = async (userId: string) => {
  const objectIdUserId = new Types.ObjectId(userId);
  const shipments = await Shipment.aggregate([
    {
      $match: { createdBy: objectIdUserId },
    },
    {
      $lookup: {
        from: "trackings",
        localField: "trackingId",
        foreignField: "_id",
        as: "trackingDetails",
      },
    },
  ]);
  if (!shipments) {
    throw new Error("Error while creating Tracking");
  }
  return shipments;
};
export default getAllShipmentsByUserId;
