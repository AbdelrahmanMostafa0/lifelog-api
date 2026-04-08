import { User } from "../../models/user.model";

export const getUserById = async (userId: string) => {
  return User.findById(userId);
};
