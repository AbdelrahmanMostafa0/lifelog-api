import * as userService from "./user.service";

export const getUsers = () => {
  console.log("getUsers");
  userService.getUsers();
};
