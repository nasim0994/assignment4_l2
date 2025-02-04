import { Link } from "react-router-dom";
import { AiOutlineCar } from "react-icons/ai";
import { MdOutlineDashboard } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";

import SidebarItems from "./SidebarItems";
import { ISidebarItem } from "@/interface/sidebarInterface";

const adminSidebarItems: ISidebarItem[] = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <AiOutlineCar />,
    title: "Car",
    path: "/admin/car/all",
  },
  {
    icon: <BsCart4 />,
    title: "Orders",
    path: "/admin/order/all",
  },
];

export default function AdminSidebar() {
  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <nav>
          <Link to="/admin/dashboard" className="py-3 block">
            <img
              className="w-[70%] mx-auto"
              src="/images/logo.png"
              alt="Logo"
            />
          </Link>

          <ul>
            {adminSidebarItems?.map((item, i) => (
              <SidebarItems key={i} item={item} />
            ))}
          </ul>
        </nav>
      </div>
    </div>
  );
}
