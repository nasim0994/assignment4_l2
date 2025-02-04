import { Link } from "react-router-dom";
import { BiStore } from "react-icons/bi";
import { HiOutlineMail } from "react-icons/hi";
import { BsTelephoneOutbound } from "react-icons/bs";

export default function Footer() {
  return (
    <footer className="bg-secondary/90 text-base-100 pb-4 pt-8">
      <div className="container">
        <div className="grid gap-8 sm:grid-cols-2 md:grid-cols-4 lg:grid-cols-5">
          <div className="md:col-span-2">
            <div className="w-max">
              <Link to="/">
                <img
                  src="/images/logo.png"
                  className="w-56"
                  alt="Logo"
                  loading="lazy"
                />
              </Link>
            </div>
            <p className="mt-3 text-sm text-gray-300">
              CARSHOP - Your ultimate destination for premium cars, trusted
              service, and unbeatable deals. Discover the ride that matches your
              dreams with us!
            </p>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase">Categories</h2>
            <ul className="text-[15px] text-gray-300 flex flex-col gap-2">
              <li>
                <Link to="/shop?category=Sedan" className="hover:underline">
                  Sedan
                </Link>
              </li>
              <li>
                <Link to="/shop?category=SUV" className="hover:underline">
                  SUV
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Truck" className="hover:underline">
                  Truck
                </Link>
              </li>
              <li>
                <Link to="/shop?category=Coupe" className="hover:underline">
                  Coupe
                </Link>
              </li>
              <li>
                <Link
                  to="/shop?category=Convertible"
                  className="hover:underline"
                >
                  Convertible
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase">Information</h2>
            <ul className="text-[15px] text-gray-300 flex flex-col gap-2">
              <li>
                <Link to="/shop" className="hover:underline">
                  Shop
                </Link>
              </li>
              <li>
                <Link to="/about-us" className="hover:underline">
                  About Us
                </Link>
              </li>
            </ul>
          </div>

          <div>
            <h2 className="mb-3 text-base font-bold uppercase">Get in Touch</h2>
            <ul className="text-[15px] text-gray-300 flex flex-col gap-2">
              <li>
                <div className="flex items-center gap-2">
                  <p>
                    <BsTelephoneOutbound className="text-base" />
                  </p>
                  <p>01706260994</p>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <p>
                    <HiOutlineMail className="text-lg" />
                  </p>
                  <p>carshop@gmail.com</p>
                </div>
              </li>
              <li>
                <div className="flex items-center gap-2">
                  <p>
                    <BiStore className="text-lg" />
                  </p>
                  <p className="italic">Gulshan 2, Dhaka 1212</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <hr className="my-4 border-gray-200 dark:border-gray-700 sm:mx-auto" />

        {/* bottom */}
        <div className="sm:flex sm:items-center sm:justify-between">
          <span className="text-sm text-gray-300">
            Copyright© 2025 carshop. All Rights Reserved. develop by{" "}
            <Link
              to="https://nasimuddin.me"
              target="_blank"
              className="underline"
            >
              Nasim Uddin
            </Link>
          </span>
          <ul className="flex items-center gap-2"></ul>
        </div>
      </div>
    </footer>
  );
}
