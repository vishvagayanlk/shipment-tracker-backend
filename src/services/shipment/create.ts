import Shipment from "../../models/Shipment";
import Tracking from "../../models/Tracking";
import { IShipment } from "../../models/types/shipment";
import utils from "../../utils";
import { TrackingStatusEnum } from "./types";

interface CreateShipmentParams {
  senderName: string;
  senderAddress: string;
  recipientAddress: string;
  recipientName: string;
  description: string;
  userId: string;
}

const createShipment = async ({
  senderName,
  senderAddress,
  recipientAddress,
  recipientName,
  description,
  userId,
}: CreateShipmentParams): Promise<IShipment> => {
  const tracking = await Tracking.create({
    status: TrackingStatusEnum.PENDING,
    trackingCode: utils.generateTrackingCode(),
    description: "Shipment in progress",
    createdBy: userId,
  });
  if (!tracking) {
    throw new Error("Error while creating Tracking");
  }
  const shipment = await Shipment.create({
    senderName,
    senderAddress,
    recipientName,
    recipientAddress,
    description,
    createdAt: new Date(),
    createdBy: userId,
    trackingId: tracking._id,
  });
  if (!shipment.trackingId) {
    throw new Error("Error while creating shipment");
  }
  return shipment;
};

export default createShipment;
