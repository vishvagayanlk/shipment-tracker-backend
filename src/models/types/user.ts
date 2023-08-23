import { Document } from "mongoose";

export interface User {
  id: string;
  name: string;
  role: string;
}

export interface IUserModal extends Omit<User, "id">, Document {
  email: string;
  password: string;
  active_jwt?: string;
}

export interface RawUser extends Omit<User, "id"> {
  _id: string;
  password: string;
  active_jwt?: string;
}
