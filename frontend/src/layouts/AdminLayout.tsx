import "@/assets/css/admin.css";
import { Outlet } from "react-router-dom";
import { useEffect, useState } from "react";
import AdminHeader from "@/components/admin/AdminHeader/AdminHeader";
import AdminSidebar from "@/components/admin/AdminSidebar/AdminSidebar";

export default function AdminLayout() {
  const [sidebar, setSidebar] = useState(false);
  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (
        (!target.closest(".admin_sidebar") &&
          !target.closest(".admin_sidebar_btn")) ||
        target.closest(".admin_siderbar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  return (
    <section className="flex">
      <aside className={`admin_sidebar ${sidebar && "admin_sidebar_show"}`}>
        <AdminSidebar />
      </aside>
      <div className="admin_content">
        <AdminHeader setSidebar={setSidebar} />
        <main className="sm:p-5 py-5">
          <Outlet />
        </main>
      </div>
    </section>
  );
}
