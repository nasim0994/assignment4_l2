import { createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "./MainRoutes";
import { adminRoutes } from "./AdminRoutes";

export const router = createBrowserRouter([mainRoutes, adminRoutes]);
