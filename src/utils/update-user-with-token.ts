import { Types } from "mongoose";
import User from "../models/User";

const updateUserWithToken = async <T extends boolean | undefined>(
  userId: string,
  token: T extends true ? null : string,
  shouldRemove?: T,
) => {
  const objectIdUserId = new Types.ObjectId(userId);
  let updatedToken: string | null = token;

  if (shouldRemove) {
    updatedToken = null;
  }
  await User.findOneAndUpdate(
    { _id: objectIdUserId },
    {
      active_jwt: updatedToken,
    },
  );
};
export default updateUserWithToken;
