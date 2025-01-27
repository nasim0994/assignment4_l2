import { userLogout } from "@/redux/features/user/authSlice";
import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
};

export default function AdminProtectedRoute({ children }: TProtectedRoute) {
  const { token } = useAppSelector((state) => state.auth);
  const dispatch = useAppDispatch();
  const location = useLocation();

  let user;
  if (token) user = verifyToken(token);

  if (!token)
    return <Navigate to="/login" state={{ from: location }} replace />;

  if (user?.role !== "admin" || !token) dispatch(userLogout());

  return children;
}
