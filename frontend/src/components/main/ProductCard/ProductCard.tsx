import { IProductCardProps } from "@/interface/carInterface";
import { Link } from "react-router-dom";

export default function ProductCard({ car }: IProductCardProps) {
  return (
    <div className="group relative flex h-full flex-col items-center justify-between gap-1 rounded-xl bg-base-100 px-2 py-4 text-center shadow-lg duration-300">
      <Link
        to={`/product/${car?._id}`}
        className="flex w-full flex-col items-center justify-between"
      >
        <figure className="group relative h-[185px] w-[90%">
          <img src={car?.image} alt="product" className="h-full w-full" />
        </figure>

        <p className="mt-4 px-3 text-[15px]">{car?.name}</p>
        <p className="text-tiny my-2 duration-300 group-hover:text-primary">
          {car?.price}৳
        </p>
      </Link>

      <div className="w-full grid grid-cols-2 gap-1 text-xs">
        <button className="whitespace-nowrap rounded border border-primary bg-primary px-[2px] py-1.5 text-white duration-300 md:px-2">
          Buy Now
        </button>

        <button className="whitespace-nowrap rounded border border-primary bg-white px-[2px] py-1.5 text-primary duration-300 md:px-2">
          Add to Cart
        </button>
      </div>
    </div>
  );
}
