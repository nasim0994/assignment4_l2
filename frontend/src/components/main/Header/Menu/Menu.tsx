import { Link } from "react-router-dom";

export default function Menu() {
  return (
    <div className="hidden bg-base-100 py-3 text-sm shadow-xl sm:block">
      <div className="container">
        <nav className="header_menu">
          <ul>
            <li>
              <Link to="/shop"> All Products </Link>
            </li>
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
        </nav>
      </div>
    </div>
  );
}
