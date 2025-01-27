import AdminLayout from "@/layouts/AdminLayout";
import AdminProtectedRoute from "@/layouts/AdminProtectedRoute";
import Dashboard from "@/pages/admin/Dashboard";

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
  ],
};
