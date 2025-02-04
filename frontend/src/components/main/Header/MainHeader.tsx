import { useEffect, useState } from "react";
import { Link, NavLink } from "react-router-dom";
import { BiLogOutCircle, BiUserCircle } from "react-icons/bi";
import { FiShoppingCart, FiLogIn } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { RxDashboard } from "react-icons/rx";
import { BsSearch } from "react-icons/bs";
import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { userLogout } from "@/redux/features/user/authSlice";

export default function MainHeader() {
  const [searchSidebar, setSearchSidebar] = useState(false);
  const [profileDropdown, setProfileDropdown] = useState(false);
  const { loggedUser } = useAppSelector((state) => state.auth);
  const { carts } = useAppSelector((state) => state.cart);
  const dispatch = useAppDispatch();

  useEffect(() => {
    window.addEventListener("click", (e) => {
      const target = e.target as HTMLElement;
      if (
        !target.closest(".profileDropdownBtn") &&
        !target.closest(".user_info")
      ) {
        setProfileDropdown(false);
      }
    });
  }, []);

  return (
    <div className="bg-secondary py-2 text-base-100">
      <div className="container">
        <div className="flex items-center justify-between gap-2">
          <div>
            <Link to="/">
              <img
                src="/images/logo.png"
                alt="logo"
                className="w-40 sm:w-48"
                loading="lazy"
              />
            </Link>
          </div>

          <div className="md:hidden flex items-center justify-center">
            <button
              onClick={() => setSearchSidebar(!searchSidebar)}
              className="pr-2"
            >
              <BsSearch className="text-xl" />
            </button>
          </div>

          <div className="hidden w-1/2 md:block">{/* <SearchBox /> */}</div>

          <div className="hidden items-center gap-3 md:flex lg:gap-8">
            <Link to="/cart" className="flex items-center gap-2.5">
              <i>
                <FiShoppingCart className="text-2xl text-primary" />
              </i>

              <div>
                <h2 className="text-sm">Cart({carts?.length})</h2>
                <p className="-mt-1 whitespace-nowrap text-[11px]">Add Items</p>
              </div>
            </Link>

            {loggedUser?.email ? (
              <div className="relative">
                <button
                  onClick={() => setProfileDropdown(!profileDropdown)}
                  className="hover:text-primary duration-300 mt-px profileDropdownBtn"
                >
                  <BiUserCircle className="text-3xl" />
                </button>

                {profileDropdown && (
                  <ul className="absolute right-0 top-[130%] z-50 w-max min-w-[220px] overflow-hidden rounded bg-base-100 text-[15px] text-neutral shadow-lg">
                    <li className="user_info border-b px-2 py-1">
                      <div className="flex items-center gap-2">
                        <BiUserCircle className="text-3xl" />
                        <div>
                          <h1 className="text-[17px]">{loggedUser?.name}</h1>
                          <p className="text-sm text-neutral-content">
                            {loggedUser?.email}
                          </p>
                        </div>
                      </div>
                    </li>

                    {loggedUser?.role === "admin" && (
                      <li>
                        <Link
                          to="/admin/dashboard"
                          className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                        >
                          <RxDashboard className="text-lg" />
                          Dashboard
                        </Link>
                      </li>
                    )}

                    <li>
                      <NavLink
                        to="/user/my-orders"
                        className="flex w-full items-center gap-1 px-3 py-1.5 duration-200 hover:bg-gray-200"
                      >
                        <IoBagCheckOutline className="text-xl" />
                        My Order List
                      </NavLink>
                    </li>

                    <li>
                      <button
                        onClick={() => dispatch(userLogout())}
                        className="flex w-full items-center gap-1 border-t px-3 py-1.5 text-red-500 duration-200 hover:bg-gray-200"
                      >
                        <BiLogOutCircle className="text-base" />
                        Logout
                      </button>
                    </li>
                  </ul>
                )}
              </div>
            ) : (
              <Link to="/login" className="flex items-center gap-2.5">
                <i>
                  <FiLogIn className="text-2xl text-primary" />
                </i>

                <div>
                  <h2 className="text-sm">Account</h2>
                  <p className="-mt-1 whitespace-nowrap text-[11px]">
                    Login or Register
                  </p>
                </div>
              </Link>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
