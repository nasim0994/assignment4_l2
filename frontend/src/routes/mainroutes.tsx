import MainLayout from "@/layouts/MainLayout";
import ProtectedRoute from "@/layouts/ProtectedRoute";
import CartPage from "@/pages/main/CartPage";
import Checkout from "@/pages/main/Checkout";
import Home from "@/pages/main/Home";
import Login from "@/pages/main/Login";
import OrderPaymentVerify from "@/pages/main/OrderPaymentVerify";
import ProductDetails from "@/pages/main/ProductDetails";
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
      path: "/user/my-orders",
      element: (
        <ProtectedRoute>
          <MyOrders />
        </ProtectedRoute>
      ),
    },
    {
      path: "/user/my-order/:id",
      element: (
        <ProtectedRoute>
          <OrderDetails />
        </ProtectedRoute>
      ),
    },
  ],
};
