import bcrypt from "bcrypt";
import hashPassword from "../../src/utils/hash-password";

describe("hashPassword", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should hash the password", async () => {
    const password = "password";
    const hashedPasswordCode = "hashedPassword";
    jest.spyOn(bcrypt, "hash").mockImplementation(() => hashedPasswordCode);
    const result = await hashPassword(password);
    expect(result).toEqual(hashedPasswordCode);
  });

  it("should throw an error if bcrypt hash fails", async () => {
    const password = "password";
    const errorMessage = "Hashing error";
    jest
      .spyOn(bcrypt, "hash")
      .mockImplementation(() => new Error(errorMessage));
    try {
      await hashPassword(password); // Await the function call
    } catch (error) {
      expect(error).toBe(errorMessage);
    }
  });
});
