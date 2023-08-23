import { Schema, Document } from "mongoose";

export interface IShipment extends Document {
  senderName: string;
  senderAddress: string;
  recipientName: string;
  recipientAddress: string;
  trackingId: Schema.Types.ObjectId;
  description: string;
  createdBy: Schema.Types.ObjectId;
  createdAt: Date;
  updatedAt: Date;
}
