import "@/assets/css/header.css";
import MainHeader from "./MainHeader";
import Menu from "./Menu/Menu";

export default function Header() {
  return (
    <header className="sticky top-0 z-40">
      <MainHeader />
      <Menu />
    </header>
  );
}
