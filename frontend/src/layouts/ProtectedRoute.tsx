import { useAppSelector } from "@/redux/hook/hooks";
import { verifyToken } from "@/utils/verifyToken";
import { ReactNode } from "react";
import { Navigate, useLocation } from "react-router-dom";

type TProtectedRoute = {
  children: ReactNode;
};

export default function ProtectedRoute({ children }: TProtectedRoute) {
  const { token } = useAppSelector((state) => state.auth);
  const location = useLocation();

  let user;
  if (token) user = verifyToken(token);

  if (!token || !user)
    return <Navigate to="/login" state={{ from: location }} replace />;

  return children;
}
