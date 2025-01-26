import MainLayout from "@/layouts/MainLayout";
import Home from "@/pages/main/Home";

export const mainRoutes = {
  path: "/",
  element: <MainLayout />,
  children: [
    {
      path: "/",
      element: <Home />,
    },
  ],
};
