import User from "../models/User";
import { RawUser } from "../models/types/user";

const getUserByEmail = async (email: string): Promise<RawUser | null> => {
  const user = await User.findOne({ email });
  return user;
};

export default getUserByEmail;
