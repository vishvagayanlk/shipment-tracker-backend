import { z } from "zod";

const createShipmentSchema = z.object({
  senderName: z.string().min(1).max(255),
  senderAddress: z.string().min(1).max(255),
  recipientName: z.string().min(1).max(255),
  recipientAddress: z.string().min(1).max(255),
  description: z.string().min(1).max(255),
});

export default createShipmentSchema;
