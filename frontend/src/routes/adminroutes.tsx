import AdminLayout from "@/layouts/AdminLayout";
import AdminProtectedRoute from "@/layouts/AdminProtectedRoute";
import Dashboard from "@/pages/admin/Dashboard";
import AllOrders from "@/pages/admin/orders/AllOrders";
import OrderDetails from "@/pages/admin/orders/OrderDetails";
import AddProduct from "@/pages/admin/product/AddProduct";
import AllProducts from "@/pages/admin/product/AllProducts";
import EditProduct from "@/pages/admin/product/EditProduct";

export const adminRoutes = {
  path: "/admin",
  element: (
    <AdminProtectedRoute>
      <AdminLayout />
    </AdminProtectedRoute>
  ),
  children: [
    {
      path: "dashboard",
      element: <Dashboard />,
    },
    {
      path: "car/all",
      element: <AllProducts />,
    },
    {
      path: "car/add",
      element: <AddProduct />,
    },
    {
      path: "car/edit/:id",
      element: <EditProduct />,
    },
    {
      path: "order/all",
      element: <AllOrders />,
    },
    {
      path: "order/:id",
      element: <OrderDetails />,
    },
  ],
};
