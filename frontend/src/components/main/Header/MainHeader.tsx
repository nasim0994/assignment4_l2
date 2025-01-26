import { FiShoppingCart } from "react-icons/fi";
import { useState } from "react";
import { FiLogIn } from "react-icons/fi";
import { Link } from "react-router-dom";
import { BsSearch } from "react-icons/bs";

export default function MainHeader() {
  const [searchSidebar, setSearchSidebar] = useState(false);

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
                <h2 className="text-sm">Cart(0)</h2>
                <p className="-mt-1 whitespace-nowrap text-[11px]">Add Items</p>
              </div>
            </Link>

            <Link to="/login" className="flex items-center gap-2.5">
              <i>
                <FiLogIn className="text-2xl text-primary" />
              </i>

              <div>
                <h2 className="text-sm">Account</h2>
                <p className="-mt-1 whitespace-nowrap text-[11px]">
                  Register or Login
                </p>
              </div>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}
