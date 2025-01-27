import AdminLayout from "@/layouts/AdminLayout";
import AdminProtectedRoute from "@/layouts/AdminProtectedRoute";
import Dashboard from "@/pages/admin/Dashboard";
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
  ],
};
