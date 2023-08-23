import { logger } from "../../core/logger";
import utils from "../../utils";

const logout = async (id: string) => {
  try {
    await utils.updateUserWithToken(id, null, true);
  } catch (error) {
    logger.error(error);
    throw new Error("Server error");
  }
};

export default logout;
