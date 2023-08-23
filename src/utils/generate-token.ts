import jwt from "jsonwebtoken";

const generateToken = (userId: string, role: string, name: string): string => {
  return jwt.sign(
    { id: userId, role: role, name: name },
    process.env.SECRET_KEY,
  );
};

export default generateToken;
