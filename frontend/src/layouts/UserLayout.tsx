import { BsCartCheckFill } from "react-icons/bs";
import { NavLink, Outlet } from "react-router-dom";

export default function UserLayout() {
  return (
    <section className="py-3">
      <div className="container">
        <div className="flex flex-col lg:flex-row items-start gap-2">
          <div className="bg-base-100 p-4 rounded shadow-lg w-full lg:w-[300px] lg:min-h-[73vh]">
            <ul>
              <li>
                <NavLink
                  to="/user/my-orders"
                  className="flex items-center gap-2"
                >
                  <BsCartCheckFill />
                  My Orders
                </NavLink>
              </li>
            </ul>
          </div>
          <main className="bg-base-100 p-4 rounded shadow-lg w-full lg:w-[calc(100%-300px)] lg:min-h-[73vh]">
            <Outlet />
          </main>
        </div>
      </div>
    </section>
  );
}
