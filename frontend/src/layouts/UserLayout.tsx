import Footer from "@/components/main/Footer/Footer";
import Header from "@/components/main/Header/Header";
import MobileBottomHeader from "@/components/main/Header/MobileBottomHeader/MobileBottomHeader";
import { useState, useEffect } from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";

export default function AccountLayout() {
  const [sidebar, setSidebar] = useState(false);
  const location = useLocation();
  const pathnameArray = location.pathname.split("/");
  pathnameArray.shift();

  const navigate = useNavigate();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (
        (!target.closest(".account_sidebar") &&
          !target.closest(".account_Sidebar_btn")) ||
        target.closest(".account_sidebar ul li a")
      ) {
        setSidebar(false);
      }
    });
  }, []);

  useEffect(() => {
    if (location?.pathname === "/account") {
      navigate("/account/profile");
    }
  }, [location?.pathname, navigate]);

  return (
    <>
      <Header />
      <section className="container min-h-[60vh] py-2">
        <div className="items-start gap-5 lg:flex">
          <aside
            className={`account_sidebar ${sidebar && "account_sidebar_show"}`}
          >
            <AccountSidebar />
          </aside>

          <>
            <main className="account_content">
              <Outlet />
            </main>
          </>
        </div>
      </section>
      <Footer />

      <MobileBottomHeader setSidebar={setSidebar} />
    </>
  );
}
