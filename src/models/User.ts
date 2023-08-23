import mongoose, { Schema } from "mongoose";
import { IUserModal } from "./types/user";

const userSchema = new Schema<IUserModal>({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, required: true },
  active_jwt: { type: String },
});
userSchema.index({ email: 1 }, { unique: true });
const User = mongoose.model<IUserModal>("User", userSchema);

export default User;
