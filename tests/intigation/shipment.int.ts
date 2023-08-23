import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/server";
import request from "supertest";

const userSetup = async (): Promise<string> => {
  const response = await request(app).post("/auth/signup").send({
    name: "Test User",
    email: "test@example.com",
    password: "password",
    role: "admin",
  });
  return response.body.token;
};

describe("Authentication", () => {
  let mongod: MongoMemoryServer;
  let token: string;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
    token = await userSetup();
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
  it("should create a new shipment", async () => {
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

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("_id");
    expect(response.body).toHaveProperty("senderName", "John Doe");
  });

  it("should get all shipments for a user", async () => {
    await request(app)
      .post("/shipment/create")
      .send({
        senderName: "John Doe",
        senderAddress: "123 Main St",
        recipientName: "Jane Smith",
        recipientAddress: "456 Elm St",
        description: "Sample shipment description",
      })
      .auth(token, { type: "bearer" });
    const response = await request(app)
      .get("/shipment/all")
      .auth(token, { type: "bearer" });

    expect(response.status).toBe(200);
    expect(response.body).toHaveLength(2);
  });
});
