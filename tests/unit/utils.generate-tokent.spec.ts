import jwt from "jsonwebtoken";
import generateToken from "../../src/utils/generate-token";

jest.mock("jsonwebtoken", () => ({
  sign: jest.fn(() => "mocked-token"),
}));

describe("utils generateToken", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should generate a valid JWT token", () => {
    const userId = "123";
    const role = "user";
    const name = "John Doe";
    const mockedToken = "mocked-token";
    const result = generateToken(userId, role, name);
    expect(jwt.sign).toHaveBeenCalledWith(
      { id: userId, role: role, name: name },
      process.env.SECRET_KEY,
    );
    expect(result).toBe(mockedToken);
  });
});
