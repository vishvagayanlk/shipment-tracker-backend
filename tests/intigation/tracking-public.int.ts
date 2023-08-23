import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/server";
import request from "supertest";
import Tracking from "../../src/models/Tracking";
import { TrackingStatusEnum } from "../../src/services/shipment/types";

const setupUserAndShipment = async (): Promise<string> => {
  const {
    body: { token },
  } = await request(app).post("/auth/signup").send({
    name: "Test User",
    email: "test@example.com",
    password: "password",
    role: "admin",
  });
  const response = await request(app)
    .post("/shipment/create")
    .send({
      senderName: "John Doe",
      senderAddress: "123 Main St",
      recipientName: "Jane Smith",
      recipientAddress: "456 Elm St",
      description: "Sample shipment description",
    })
    .auth(token, { type: "bearer" });
  const trackingDetails = await Tracking.findOne({
    _id: response.body.trackingId,
  });
  return trackingDetails!.trackingCode;
};

describe("Authentication", () => {
  let mongod: MongoMemoryServer;
  let trackingCode: string;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
    trackingCode = await setupUserAndShipment();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
  it("user should able to track shipment", async () => {
    const response = await request(app).get("/track").query({
      trackingCode,
    });
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("status");
    expect(response.body).toHaveProperty("status", TrackingStatusEnum.PENDING);
  });
});
