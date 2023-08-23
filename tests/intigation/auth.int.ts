import mongoose from "mongoose";
import { MongoMemoryServer } from "mongodb-memory-server";
import app from "../../src/server";
import Request from "supertest";
import User from "../../src/models/User";

describe("Authentication", () => {
  let mongod: MongoMemoryServer;
  beforeAll(async () => {
    mongod = await MongoMemoryServer.create();
    const mongoUri = mongod.getUri();
    await mongoose.connect(mongoUri);
  });

  afterAll(async () => {
    await mongoose.disconnect();
    await mongod.stop();
  });
  it("should signup a user", async () => {
    const response = await Request(app).post("/auth/signup").send({
      name: "Test User",
      email: "test@example.com",
      password: "password",
      role: "admin",
    });
    const userData = await User.findOne({ email: "test@example.com" });
    expect(userData?.active_jwt).toStrictEqual(response.body.token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });

  it("should login a user", async () => {
    const response = await Request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password" });
    const userData = await User.findOne({ email: "test@example.com" });
    expect(userData?.active_jwt).toStrictEqual(response.body.token);
    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty("token");
  });
  it("should logout a user", async () => {
    const responseLogin = await Request(app)
      .post("/auth/login")
      .send({ email: "test@example.com", password: "password" });
    const response = await Request(app)
      .post("/auth/logout")
      .auth(responseLogin.body.token, { type: "bearer" });
    expect(response.status).toBe(200);
    const userData = await User.findOne({ email: "test@example.com" });
    expect(userData?.active_jwt).toStrictEqual(null);
  });
});
