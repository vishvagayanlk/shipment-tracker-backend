import User from "../../models/User";
import { logger } from "../../core/logger";
import utils from "../../utils";

interface SignupData {
  name: string;
  email: string;
  password: string;
  role: string;
}

const signup = async ({ name, email, password, role }: SignupData) => {
  try {
    const isUserAlreadyExits = await utils.getUserByEmail(email);
    if (isUserAlreadyExits) {
      logger.error(`User Already exits: ${email}`);
      throw new Error("User already exists");
    }
    const hashedPassword = await utils.hashPassword(password);
    const newUser = await User.create({
      name,
      email,
      password: hashedPassword,
      role,
    });
    const token = utils.generateToken(newUser._id, newUser.role, newUser.name);
    await utils.updateUserWithToken(newUser._id, token);
    return token;
  } catch (error) {
    logger.error(error);
    throw new Error("Server error");
  }
};
export default signup;
