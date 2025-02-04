import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import UserLayout from "@/layouts/UserLayout";
import AboutUs from "@/pages/main/AboutUs";
import CartPage from "@/pages/main/CartPage";
import Checkout from "@/pages/main/Checkout";
import Home from "@/pages/main/Home";
import Login from "@/pages/main/Login";
import OrderPaymentVerify from "@/pages/main/OrderPaymentVerify";
import ProductDetails from "@/pages/main/ProductDetails";
import Register from "@/pages/main/Register";
import Shop from "@/pages/main/Shop";
import MyOrders from "@/pages/user/MyOrders";
import OrderDetails from "@/pages/user/OrderDetails";

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
      path: "/register",
      element: <Register />,
    },
    {
      path: "/product/:id",
      element: <ProductDetails />,
    },
    {
      path: "/shop",
      element: <Shop />,
    },
    {
      path: "/cart",
      element: <CartPage />,
    },
    {
      path: "/about-us",
      element: <AboutUs />,
    },
    {
      path: "/checkout",
      element: (
        <ProtectedRoute>
          <Checkout />
        </ProtectedRoute>
      ),
    },
    {
      path: "/order/payment/verify",
      element: (
        <ProtectedRoute>
          <OrderPaymentVerify />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user",
      element: (
        <ProtectedRoute>
          <UserLayout />
        </ProtectedRoute>
      ),
      children: [
        {
          path: "my-orders",
          element: <MyOrders />,
        },
        {
          path: "my-order/:id",
          element: <OrderDetails />,
        },
      ],
    },
  ],
};
