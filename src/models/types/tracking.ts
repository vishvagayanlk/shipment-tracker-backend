import { Schema, Document } from "mongoose";

export interface ITracking extends Document {
  status: string;
  trackingCode: string;
  description: string;
  createdBy: Schema.Types.ObjectId;
  updatedBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
