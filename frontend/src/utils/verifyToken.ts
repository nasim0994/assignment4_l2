import { TUser } from "@/redux/features/user/authSlice";
import { jwtDecode } from "jwt-decode";

export const verifyToken = (token: string) => {
  const user: TUser = jwtDecode(token);
  return user;
};
