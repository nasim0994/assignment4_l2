import {
  MdOutlineRemoveShoppingCart,
  MdOutlineDeleteSweep,
} from "react-icons/md";
import { Link } from "react-router-dom";
// import { FaArrowRight } from "react-icons/fa6";
import { useAppDispatch, useAppSelector } from "@/redux/hook/hooks";
import { clearCart } from "@/redux/features/cart/cartSlice";
import CartItem from "@/components/main/cart/CartItem";
import { FaArrowRight } from "react-icons/fa";

export default function CartPage() {
  window.scrollTo(0, 0);
  const carts = useAppSelector((state) => state.cart.carts);
  const dispatch = useAppDispatch();

  const total = carts?.reduce(
    (price, item) => price + item.quantity * item?.price,
    0
  );

  return (
    <div className="min-h-[60vh] py-5">
      <div className="container">
        {carts?.length > 0 ? (
          <>
            <p className="mb-8 text-center text-xl font-medium">
              Your Cart - <span>{carts?.length || "0"}</span>{" "}
              {carts?.length ? (carts.length < 2 ? "Item" : "Items") : "Item"}
            </p>

            <div className="rounded-md border shadow-lg">
              <div className="relative overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr>
                      <th className="w-[60%] px-6">Car</th>
                      <th className="w-[10%] px-6">Price</th>
                      <th className="w-[10%] px-6">QUANTITY</th>
                      <th className="w-[10%] px-6">Total</th>
                      <th className="w-[10%] px-6">Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {carts?.length > 0 &&
                      carts?.map((car, i) => <CartItem key={i} car={car} />)}
                  </tbody>
                </table>
              </div>
              <div className="flex items-center gap-4 p-3 text-sm">
                <Link
                  to="/shops"
                  className="primary_btn flex items-center gap-2"
                >
                  <FaArrowRight className="-rotate-180" /> Continue to shopping
                </Link>

                <button
                  onClick={() => {
                    const isConfirm = window.confirm(
                      "Are you sure clear all carts?"
                    );
                    if (isConfirm) dispatch(clearCart());
                  }}
                  className="flex items-center gap-2 rounded bg-red-500 px-4 py-2 text-base-100"
                >
                  Clear Carts <MdOutlineDeleteSweep className="text-base" />
                </button>
              </div>
            </div>

            <div className="flex justify-end">
              <div className="mt-1 min-w-full rounded-md border bg-base-100 p-4 shadow-lg sm:min-w-[500px]">
                <div className="flex items-center justify-between border-b pb-2 text-lg font-medium">
                  <h3>Total</h3>
                  <p>৳{total}</p>
                </div>

                <div className="mt-4">
                  <Link
                    to="/checkout"
                    className="flex scale-[.99] items-center justify-center gap-4 rounded bg-primary p-2 text-center text-sm font-semibold text-base-100 duration-300 hover:scale-[1]"
                  >
                    PROCEED TO CHECKOUT <FaArrowRight />
                  </Link>
                </div>
              </div>
            </div>
          </>
        ) : (
          <div className="flex min-h-[50vh] flex-col items-center justify-center gap-3">
            <MdOutlineRemoveShoppingCart className="text-6xl text-primary" />
            <h2 className="text-xl">Your cart is Empty</h2>
            <Link
              to="/shops"
              className="rounded bg-primary px-6 py-2 text-sm text-base-100"
            >
              Continue to shopping
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
