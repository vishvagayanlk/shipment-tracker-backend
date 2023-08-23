import User from "../../src/models/User";
import getUserByEmail from "../../src/utils/get-user-by-email";

describe("getUserByEmail", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  it("should return the user with the given email", async () => {
    const mockedUser = { name: "John Doe", email: "john@example.com" };
    const findOneMock = jest
      .spyOn(User, "findOne")
      .mockResolvedValue(mockedUser);
    const result = await getUserByEmail("john@example.com");
    expect(findOneMock).toHaveBeenCalledWith({ email: "john@example.com" });
    expect(result).toEqual(mockedUser);
    findOneMock.mockRestore();
  });

  it("should return null if no user found with the given email", async () => {
    const findOneMock = jest.spyOn(User, "findOne").mockResolvedValue(null);
    const result = await getUserByEmail("nonexistent@example.com");
    expect(findOneMock).toHaveBeenCalledWith({
      email: "nonexistent@example.com",
    });
    expect(result).toBeNull();
    findOneMock.mockRestore();
  });
});
