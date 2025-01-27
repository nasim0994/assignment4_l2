import { Link } from "react-router-dom";
import { MdMonitor, MdOutlineDashboard, MdContactPhone } from "react-icons/md";
import { BsCart4 } from "react-icons/bs";
import { FcAbout } from "react-icons/fc";
import { RiAdminFill } from "react-icons/ri";
import { FaChartLine } from "react-icons/fa";
import { MdFeaturedPlayList } from "react-icons/md";
import { PiFlagBannerFill } from "react-icons/pi";
import SidebarItems from "./SidebarItems";
import { ISidebarItem } from "@/interface/sidebarInterface";

const adminSidebarItems: ISidebarItem[] = [
  {
    icon: <MdOutlineDashboard />,
    title: "Dashboard",
    path: "/admin/dashboard",
  },
  {
    icon: <BsCart4 />,
    title: "Product",
    path: "/admin/product/all",
  },
  {
    icon: <BsCart4 />,
    title: "Orders",
    path: "/admin/orders",
  },

  {
    icon: <MdFeaturedPlayList />,
    title: "Feature",

    subMenu: [
      {
        title: "Section",
        path: "/admin/feature/section",
      },
      {
        title: "Features",
        path: "/admin/features/all",
      },
    ],
  },

  {
    icon: <PiFlagBannerFill />,
    title: "Banner",
    path: "/admin/banner",
  },
  {
    icon: <FcAbout />,
    title: "FAQ",
    subMenu: [
      {
        title: "FAQ Section",
        path: "/admin/faq-section",
      },
      {
        title: "FAQ",
        path: "/admin/faq",
      },
    ],
  },
  {
    icon: <MdContactPhone />,
    title: "Business Info",
    path: "/admin/businessInfo",
  },

  {
    icon: <MdMonitor />,
    title: "Front-End Setting",
    subMenu: [
      {
        title: "Logo",
        path: "/admin/front-end/logo",
      },
      {
        title: "Favicon",
        path: "/admin/front-end/favicon",
      },
    ],
  },
  {
    icon: <RiAdminFill />,
    title: "Administrator",
    path: "/admin/administrator/all",
  },

  {
    icon: <FaChartLine />,
    title: "SEO Setting",
    path: "/admin/seo",
  },
];

export default function AdminSidebar() {


  return (
    <div className="h-full flex flex-col justify-between">
      <div>
        <nav >
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
