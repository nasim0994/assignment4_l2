import { useState } from "react";
import { Link, NavLink } from "react-router-dom";

type MobileMenuSidebarProps = {
  mobileMenu: boolean;
  setMobileMenu: (value: boolean) => void;
};

export default function MobileMenuSidebar({
  mobileMenu,
  setMobileMenu,
}: MobileMenuSidebarProps) {
  const [tab, setTab] = useState(2);
  return (
    <div className="lg:hidden">
      <button
        onClick={() => setMobileMenu(false)}
        className={`overlay ${mobileMenu && "overlay_show"}`}
      ></button>
      <div className={`menu_wrap ${mobileMenu && "menu_wrap_show"} text-sm`}>
        <div className="mt-4 grid grid-cols-2 border-b pb-3">
          <button
            onClick={() => setTab(1)}
            className={`${tab === 1 && "text-primary"} border-r`}
          >
            Ganerel
          </button>
          <button
            onClick={() => setTab(2)}
            className={`${tab === 2 && "text-primary"}`}
          >
            Category
          </button>
        </div>

        <div className="mt-4">
          {tab === 1 && (
            <ul className="flex flex-col gap-2 px-4">
              <li>
                <NavLink to="/">Home</NavLink>
              </li>
              <li>
                <NavLink to="/shop">All Products</NavLink>
              </li>
              <li>
                <NavLink to="/about-us">About Us</NavLink>
              </li>
            </ul>
          )}

          {tab === 2 && (
            <ul className="flex flex-col gap-2 px-4">
              <li>
                <Link to="/shop?category=Sedan"> Sedan </Link>
              </li>
              <li>
                <Link to="/shop?category=SUV"> SUV </Link>
              </li>
              <li>
                <Link to="/shop?category=Truck"> Truck</Link>
              </li>
              <li>
                <Link to="/shop?category=Coupe"> Coupe</Link>
              </li>
              <li>
                <Link to="/shop?category=Convertible"> Convertible</Link>
              </li>
            </ul>
          )}
        </div>
      </div>
    </div>
  );
}
