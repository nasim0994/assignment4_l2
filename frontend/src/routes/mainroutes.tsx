import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import Checkout from "@/pages/main/Checkout";
import Home from "@/pages/main/Home";
import Login from "@/pages/main/Login";
import ProductDetails from "@/pages/main/ProductDetails";

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
      path: "/product/:id",
      element: <ProductDetails />,
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
