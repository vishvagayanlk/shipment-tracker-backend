import generateToken from "./generate-token";
import generateTrackingCode from "./generate-tracking-code";
import getUserByEmail from "./get-user-by-email";
import hashPassword from "./hash-password";
import updateUserWithToken from "./update-user-with-token";

const utils = {
  getUserByEmail,
  generateToken,
  updateUserWithToken,
  hashPassword,
  generateTrackingCode,
};
export default utils;
