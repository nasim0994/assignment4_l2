import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Checkout from "@/pages/main/Checkout";
import Home from "@/pages/main/Home";
import Login from "@/pages/main/Login";

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
  ],
};
