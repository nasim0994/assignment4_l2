import { createBrowserRouter } from "react-router-dom";
import { mainRoutes } from "@/routes/mainRoutes";
import { adminRoutes } from "@/routes/adminRoutes";

export const router = createBrowserRouter([mainRoutes, adminRoutes]);
