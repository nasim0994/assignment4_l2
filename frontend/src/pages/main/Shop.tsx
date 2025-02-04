import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useGetAllCarsQuery } from "@/redux/features/carApi";
import ProductCard from "@/components/main/ProductCard/ProductCard";
import { ICar } from "@/interface/carInterface";
import ProductCards from "@/components/skeleton/ProductCards";
import Pagination from "@/components/Pagination/Pagination";
import { MdKeyboardArrowRight, MdDoNotDisturbAlt } from "react-icons/md";
import PriceRangeSlider from "@/components/main/PriceRangeSlider/PriceRangeSlider";

type IQuery = {
  page?: number;
  limit?: number;
  category?: string | null;
  brand?: string;
  sortBy?: string;
  sortOrder?: string;
  search?: string;
  range?: string;
};

export default function Shop() {
  window.scrollTo(0, 0);
  const location = useLocation();
  const [sort, setSort] = useState("desc");

  const queryParams = new URLSearchParams(location.search);
  const category = queryParams.get("category");

  const STEP = 10000;
  const MIN = 0;
  const MAX = 10000000;
  const [values, setValues] = useState([MIN, MAX]);

  const query: IQuery = {};
  const [currentPage, setCurrentPage] = useState(1);
  query["page"] = currentPage;
  query["limit"] = 8;
  query["sortBy"] = "price";
  query["sortOrder"] = sort;
  if (category) query["category"] = category;
  query["range"] = JSON.stringify(values);

  const { data, isLoading, isFetching, isError } = useGetAllCarsQuery(query);
  const cars: ICar[] = data?.data;

  let content = null;

  if (!isLoading && !isError && cars?.length > 0) {
    content = cars?.map((car) => <ProductCard key={car?._id} car={car} />);
  }

  if (!isLoading && !isError && data?.data?.length == 0) {
    content = (
      <div className="col-span-4 flex h-[70vh] w-full flex-col items-center justify-center gap-2 p-4 text-red-500">
        <MdDoNotDisturbAlt className="text-xl" />
        No Product available
      </div>
    );
  }

  return (
    <section className="min-h-[70vh] bg-gray-50 py-5">
      <div className="container">
        <ul className="flex items-center gap-2 text-sm text-neutral-content">
          <li>
            <Link to="/" className="text-primary">
              Home
            </Link>
          </li>
          <li>
            <MdKeyboardArrowRight />
          </li>
          {category ? (
            <>
              <li>
                <Link to="/shop" className="text-primary">
                  Shops
                </Link>
              </li>
            </>
          ) : (
            <li>Shops</li>
          )}
        </ul>

        <div className="mt-4 gap-4 md:flex">
          <div className="shop_categories hidden h-full md:block">
            <h3 className="border-b pb-1 font-medium text-neutral">Category</h3>
            <div className="mt-2 text-[15px]">
              <ul className="">
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
            </div>

            <br />

            <PriceRangeSlider
              values={values}
              setValues={setValues}
              MIN={MIN}
              MAX={MAX}
              STEP={STEP}
            />
          </div>

          <div className="shop_products min-h-[70vh]">
            <div className="my-2 flex justify-between">
              <div>
                <p className="text-sm font-normal text-neutral">
                  {isFetching
                    ? "Loading..."
                    : `${data?.meta?.total} cars found`}{" "}
                  {category && (
                    <span>
                      in{" "}
                      {category.charAt(0).toUpperCase() +
                        category.slice(1).toLowerCase()}
                    </span>
                  )}
                </p>
              </div>
              <div className="w-48 text-neutral/50">
                <select
                  id="sort-by"
                  value={sort}
                  onChange={(e) => setSort(e.target.value)}
                  className="block w-full rounded-lg border border-gray-300 bg-white p-1 focus:border-blue-500 focus:outline-none text-sm"
                >
                  <option value="desc">Sort by</option>
                  <option className="text-black" value="asc">
                    Price Low to High
                  </option>
                  <option className="text-black" value="desc">
                    Price High to Low
                  </option>
                </select>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-2 lg:grid-cols-3 xl:grid-cols-4">
              {isLoading || isFetching ? <ProductCards /> : content}
            </div>

            {data?.meta?.pages > 1 && (
              <Pagination
                pages={data?.meta?.pages}
                currentPage={currentPage}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
