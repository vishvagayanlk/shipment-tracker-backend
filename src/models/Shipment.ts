import mongoose, { Schema } from "mongoose";
import { IShipment } from "./types/shipment";

const shipmentSchema = new Schema<IShipment>(
  {
    senderName: { type: String, required: true },
    senderAddress: { type: String, required: true },
    recipientName: { type: String, required: true },
    recipientAddress: { type: String, required: true },
    description: { type: String, required: true },
    createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
    trackingId: {
      type: Schema.Types.ObjectId,
      ref: "Trackings",
      required: true,
    },
  },
  { timestamps: true },
);
const Shipment = mongoose.model<IShipment>("Shipment", shipmentSchema);

export default Shipment;
