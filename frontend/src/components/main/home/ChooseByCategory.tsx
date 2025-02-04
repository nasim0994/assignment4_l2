import { Link } from "react-router-dom";

export default function ChooseByCategory() {
  return (
    <div className="py-10">
      <div className="container">
        <div className="text-center">
          <h1 className="text-xl font-medium uppercase text-neutral md:text-2xl md:font-semibold">
            FEATURED CATEGORIES
          </h1>

          <p className="mt-2 text-sm text-neutral-content">
            Get your desired product from featured category
          </p>
        </div>

        <div className="mt-6 grid grid-cols-2 gap-2 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 text-center">
          <Link to={`/shop?category=Sedan`} className="feature_category_card">
            <div>
              <img
                src="/images/categories/Sedan.png"
                alt="Sedan"
                className="mx-auto w-14 grayscale"
                loading="lazy"
              />
              <h6 className="mt-3 md:text-[15px]">Sedan</h6>
            </div>
          </Link>
          <Link to={`/shop?category=SUV`} className="feature_category_card">
            <div>
              <img
                src="/images/categories/SUV.png"
                alt="SUV"
                className="mx-auto w-14 grayscale"
                loading="lazy"
              />
              <h6 className="mt-3 md:text-[15px]">SUV</h6>
            </div>
          </Link>
          <Link to={`/shop?category=Truck`} className="feature_category_card">
            <div>
              <img
                src="/images/categories/truck.png"
                alt="Truck"
                className="mx-auto w-14 grayscale"
                loading="lazy"
              />
              <h6 className="mt-3 md:text-[15px]">Truck</h6>
            </div>
          </Link>
          <Link to={`/shop?category=Coupe`} className="feature_category_card">
            <div>
              <img
                src="/images/categories/Coupe.png"
                alt="Coupe"
                className="mx-auto w-14 grayscale"
                loading="lazy"
              />
              <h6 className="mt-3 md:text-[15px]">Coupe</h6>
            </div>
          </Link>
          <Link
            to={`/shop?category=Convertible`}
            className="feature_category_card"
          >
            <div>
              <img
                src="/images/categories/Convertible.png"
                alt="Convertible"
                className="mx-auto w-14 grayscale"
                loading="lazy"
              />
              <h6 className="mt-3 md:text-[15px]">Convertible</h6>
            </div>
          </Link>
          <Link
            to={`/shop?category=Hatchback`}
            className="feature_category_card"
          >
            <div>
              <img
                src="/images/categories/Hatchback.png"
                alt="Convertible"
                className="mx-auto w-14 grayscale"
                loading="lazy"
              />
              <h6 className="mt-3 md:text-[15px]">Hatchback</h6>
            </div>
          </Link>
        </div>
      </div>
    </div>
  );
}
