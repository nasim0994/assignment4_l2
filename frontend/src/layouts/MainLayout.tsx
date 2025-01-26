import { Outlet } from "react-router-dom";

export default function MainLayout() {
  return (
    <>
      <header>Header</header>
      <main className="min-h-[85vh]">
        <Outlet />
      </main>
      <footer>Footer</footer>
    </>
  );
}
