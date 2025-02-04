import { ICar, IProductCardProps } from "@/interface/carInterface";
import { addToCart, buyNow } from "@/redux/features/cart/cartSlice";
import { useAppDispatch } from "@/redux/hook/hooks";
import { Link, useNavigate } from "react-router-dom";

export default function ProductCard({ car }: IProductCardProps) {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const selectedQuantity = 1;

  const handleBuyNow = (car: ICar) => {
    dispatch(buyNow({ car, selectedQuantity }));
    navigate("/checkout");
  };

  const handelAddToCart = (car: ICar) => {
    dispatch(addToCart({ car, selectedQuantity }));
  };

  return (
    <div className="group relative flex h-full flex-col items-center justify-between gap-1 rounded-xl bg-base-100 px-2 py-4 text-center shadow-lg duration-300">
      <Link
        to={`/product/${car?._id}`}
        className="flex w-full flex-col items-center justify-between"
      >
        <figure className="group relative h-[185px] w-[90%">
          <img
            src={`${import.meta.env.VITE_BACKEND_URL}/${car?.image}`}
            alt="product"
            className="h-full w-full"
          />
        </figure>

        <p className="mt-4 px-3 text-[15px]">{car?.name}</p>
        <p className="text-tiny my-2 duration-300 group-hover:text-primary">
          {car?.price}৳
        </p>
      </Link>

      <div className="w-full grid grid-cols-2 gap-1 text-xs">
        <button
          onClick={() => handleBuyNow(car)}
          className="whitespace-nowrap rounded border border-primary bg-primary px-[2px] py-1.5 text-white duration-300 md:px-2"
        >
          Buy Now
        </button>

        <button
          onClick={() => handelAddToCart(car)}
          className="whitespace-nowrap rounded border border-primary bg-white px-[2px] py-1.5 text-primary duration-300 md:px-2"
        >
          Add to Cart
        </button>
      </div>
    </div>
  );
}
