import User from "../models/User";

const isUserHasActiveJwt = async (id: string): Promise<boolean> => {
  const user = await User.findOne({
    _id: id,
    active_jwt: { $exists: true, $ne: null },
  });
  return !!user;
};

export default isUserHasActiveJwt;
