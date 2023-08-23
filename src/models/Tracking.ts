import mongoose, { Schema } from "mongoose";
import { ITracking } from "./types/tracking";

const trackingSchema = new mongoose.Schema<ITracking>({
  status: { type: String, required: true },
  trackingCode: { type: String, required: true },
  description: { type: String, required: true },
  createdBy: { type: Schema.Types.ObjectId, ref: "User", required: true },
  updatedBy: { type: Schema.Types.ObjectId, ref: "User" },
});
trackingSchema.index({ trackingCode: 1 }, { unique: true });
const Tracking = mongoose.model<ITracking>("Tracking", trackingSchema);

export { Schema };
export default Tracking;
