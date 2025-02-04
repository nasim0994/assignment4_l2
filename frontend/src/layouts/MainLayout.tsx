import Footer from "@/components/main/Footer/Footer";
import Header from "@/components/main/Header/Header";
import MobileBottomHeader from "@/components/main/Header/MobileBottomHeader/MobileBottomHeader";
import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <Header />
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <Footer />

      <MobileBottomHeader />
    </>
  );
}
