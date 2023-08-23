import bcrypt from "bcrypt";
import { logger } from "../../core/logger";
import utils from "../../utils";
import getUserByEmail from "../../utils/get-user-by-email";

interface LoginData {
  email: string;
  password: string;
}

const login = async ({ email, password }: LoginData) => {
  try {
    const user = await getUserByEmail(email);
    if (!user) {
      logger.error(`Invalid credentials`);
      throw new Error("Invalid credentials");
    }
    const passwordMatch = await bcrypt.compare(password, user.password);
    if (!passwordMatch) {
      logger.error(`Invalid credentials`);
      throw new Error("Invalid credentials");
    }
    const { _id: id, role, name } = user;
    const token = utils.generateToken(id, role, name);
    await utils.updateUserWithToken(id, token);
    return token;
  } catch (error) {
    logger.error(error);
    throw new Error(`Error While Logging ${error}`);
  }
};

export default login;
