import { User } from "../src/models/types/user";

declare global {
  namespace Express {
    interface Request {
      user?: User;
    }
  }
}
