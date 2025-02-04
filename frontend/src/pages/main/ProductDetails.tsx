import { useGetCarByIdQuery } from "@/redux/features/carApi";
import { addToCart, buyNow } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook/hooks";
import { useState } from "react";
import toast from "react-hot-toast";
import { FaOpencart } from "react-icons/fa";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { IoBagCheckOutline } from "react-icons/io5";
import { useNavigate, useParams } from "react-router-dom";

export default function ProductDetails() {
  window.scrollTo(0, 0);
  const { id } = useParams<{ id: string }>();
  const { data, isLoading } = useGetCarByIdQuery(id);
  const car = data?.data;

  const [selectedQuantity, setSelectedQuantity] = useState(1);

  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const handelDecrease = () => {
    if (selectedQuantity > 1) {
      setSelectedQuantity(selectedQuantity - 1);
    } else {
      toast.error("Minimum quantity is 1");
    }
  };

  const handelIncrease = () => {
    if (car?.stock > selectedQuantity) {
      setSelectedQuantity(selectedQuantity + 1);
    } else {
      toast.error("Maximum quantity reached");
    }
  };

  const handleBuyNow = () => {
    dispatch(buyNow({ car, selectedQuantity }));
    navigate("/checkout");
  };

  const handelAddToCart = () => {
    dispatch(addToCart({ car, selectedQuantity }));
  };

  if (isLoading) return <div>Loading...</div>;

  return (
    <section className="py-5">
      <div className="container">
        <div className="grid sm:grid-cols-2 gap-10">
          <div>
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/${car?.image}`}
              alt={car?.title}
            />
          </div>

          <div>
            <p className="w-max text-xs rounded bg-primary/10 px-2 py-1 text-primary">
              {car?.category}
            </p>
            <h1 className="mt-2 text-2xl font-medium text-neutral">
              {car?.name}
            </h1>
            <div className="mt-1">
              {car?.stock > 0 ? (
                <p className="text-xs text-primary">In Stock</p>
              ) : (
                <p className="text-xs text-red-500">Out of Stock</p>
              )}
            </div>

            <div className="mt-1 text-[13px] text-neutral-content">
              <p>
                <span className="text-neutral/80">Brand:</span>{" "}
                <span>{car?.brand}</span>
              </p>
              <p>
                <span className="text-neutral/80">Model:</span>{" "}
                <span>{car?.model}</span>
              </p>
              <p>
                <span className="text-neutral/80">Year:</span>{" "}
                <span>{car?.year}</span>
              </p>
            </div>

            {/* Price */}
            <div className="mt-3 flex items-center justify-between py-3 pr-2">
              <div className="flex items-center gap-6">
                <p className="text-neutral-content">Price: </p>

                <div className="flex items-end gap-2">
                  <p className="text-2xl font-medium text-primary">
                    ৳ {parseInt(car?.price)}
                  </p>
                </div>
              </div>
            </div>

            {/* Quantity */}
            <div className="flex items-center gap-4 border-y py-3">
              <h3 className="text-neutral-content">Quantity: </h3>

              <div className="flex gap-2">
                <button
                  onClick={handelDecrease}
                  className="text-2xl duration-200 hover:text-neutral"
                >
                  <FiMinusCircle />
                </button>
                <div>
                  <p className="w-10 text-center font-semibold">
                    {selectedQuantity}
                  </p>
                </div>
                <button
                  onClick={handelIncrease}
                  className="text-2xl duration-200 hover:text-neutral"
                >
                  <FiPlusCircle />
                </button>
              </div>
            </div>

            {/* Buttons */}
            <div className="mt-6 grid grid-cols-2 items-center gap-2 sm:grid-cols-3">
              <button
                onClick={handleBuyNow}
                className="flex scale-[.97] items-center justify-center gap-2 rounded bg-primary px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
              >
                <IoBagCheckOutline />
                Buy Now
              </button>

              <button
                onClick={handelAddToCart}
                className="flex scale-[.97] items-center justify-center gap-2 rounded bg-accent px-2 py-1.5 text-base-100 duration-300 hover:scale-[1]"
              >
                <FaOpencart />
                Add To Cart
              </button>
            </div>
          </div>
        </div>

        <div className="mt-4">
          <div className="border-b border-neutral/20 pb-1">
            <h2>Description</h2>
          </div>

          <div>
            <p className="mt-2 text-neutral-content">{car?.description}</p>
          </div>
        </div>
      </div>
    </section>
  );
}
