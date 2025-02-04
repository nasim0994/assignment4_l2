import { useState } from "react";
import { useAppSelector } from "@/redux/hook/hooks";
import toast from "react-hot-toast";

type OrderProduct = {
  productId: string;
  quantity: number;
};

export default function Checkout() {
  window.scrollTo(0, 0);
  const { carts } = useAppSelector((state) => state.cart);
  const { loggedUser } = useAppSelector((state) => state.auth);
  const [shipping, setShipping] = useState(0);

  // const [addOrder, { isLoading }] = useAddOrderMutation();

  const [paymentMethod, setPaymentMethod] = useState("cod");

  // Subtotal - discount amount
  const subTotal = carts?.reduce(
    (price, item) => price + item?.quantity * item?.price,
    0
  );

  const tax = 0;
  const grandTotal = subTotal + tax + shipping;

  const handelPlaceOrder = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (shipping == 0) return toast.error("Please select shipping area");

    const form = e.target as HTMLFormElement;
    const formData = new FormData(form);
    const name = formData.get("name");
    const number = formData.get("number");
    const email = formData.get("email");
    const address = formData.get("fullAdress");
    const note = formData.get("note");

    const products: OrderProduct[] = [];
    carts.map((car) =>
      products.push({
        productId: car._id,
        quantity: car.quantity,
      })
    );

    const order = {
      user: {
        name,
        email,
        phone: number,
      },
      shippingInfo: {
        address,
        note,
      },
      paymentMethod,
      products,
      totalPrice: grandTotal,
      shippingCharge: shipping,
    };

    console.log(order);
  };

  return (
    <div className="pt-5">
      <div className="container">
        <form onSubmit={handelPlaceOrder} className="grid gap-4 lg:grid-cols-3">
          {/* Shipping Details */}
          <div className="rounded bg-base-100 p-6 lg:col-span-2">
            <div>
              <h3 className="mb-4 text-lg font-semibold uppercase">
                Shipping Details
              </h3>

              <div className="grid gap-4 text-sm md:grid-cols-2">
                <div>
                  <h3>Full name</h3>
                  <input
                    type="text"
                    name="name"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                    defaultValue={loggedUser?.name}
                  />
                </div>
                <div>
                  <h3>Phone</h3>
                  <input
                    type="number"
                    name="number"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    required
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <div>
                  <h3>Email address</h3>
                  <input
                    type="email"
                    name="email"
                    className="mt-2 w-full rounded border-2 p-2 outline-none"
                    defaultValue={loggedUser?.email}
                  />
                </div>
              </div>

              <div className="mt-2 text-sm">
                <h3>Full Adress</h3>
                <textarea
                  name="fullAdress"
                  rows={3}
                  placeholder="House number and fullAdress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                  required
                ></textarea>
              </div>

              <div className="mt-2 text-sm">
                <h3>Order Note</h3>
                <textarea
                  name="note"
                  rows={4}
                  placeholder="House number and fullAdress name"
                  className="mt-2 w-full rounded border-2 p-2 outline-none"
                ></textarea>
              </div>
            </div>
          </div>

          {/* Order details */}
          <div className="checkout-output relative rounded bg-base-100 p-6">
            <div className="mb-4 border-b pb-4">
              <h3 className="font-medium text-neutral">Payment Method</h3>

              <ul className="mt-2 flex flex-col gap-1 pl-2 text-sm text-neutral-content">
                <li className="flex items-center justify-between">
                  <div className="flex items-center">
                    <input
                      id="ssl"
                      type="radio"
                      name="payment_method"
                      className="w-3 h-3 cursor-pointer"
                      checked={paymentMethod === "ssl" && true}
                      onClick={() => setPaymentMethod("ssl")}
                    />
                    <label htmlFor="ssl" className="ms-2 cursor-pointer">
                      SSL
                    </label>
                  </div>

                  <div>
                    <img src="/images/ssl.png" alt="" className="h-4" />
                  </div>
                </li>
              </ul>
            </div>
            <div>
              <h3 className="tetx-xl font-medium text-neutral">
                Order Summary
              </h3>

              <div className="flex justify-between border-b py-1.5 text-sm">
                <h3>Subtotal</h3>
                <p>
                  ৳<span>{subTotal}.00</span>
                </p>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Area</h3>
                <div className="text-end">
                  <select
                    className="rounded border p-1 outline-none"
                    required
                    onChange={(e) => setShipping(parseInt(e.target.value))}
                  >
                    <option value="0">Select Shipping Area</option>
                    <option value={80}>Inside Dhaka - 80 tk</option>
                    <option value={130}>Inside Dhaka - 130 tk</option>
                  </select>
                </div>
              </div>

              <div className="flex items-center justify-between border-b py-1.5 text-sm">
                <h3>Shipping Charge</h3>
                <div className="text-end">
                  ৳<span>{shipping}.00</span>
                </div>
              </div>

              {/* <!-- Total --> */}
              <div className="flex justify-between border-b py-2 text-lg font-medium">
                <h3 className="text-title">Total</h3>
                <p className="text-primary">
                  ৳ <span>{grandTotal}.00 </span>
                </p>
              </div>
            </div>

            <button
              type="submit"
              className="flex w-full justify-center rounded bg-primary py-2 text-base-100 shadow"
            >
              {/* {isLoading ? <ButtonSpinner /> : "PLACE ORDER"} */}
            </button>
          </div>
        </form>

        <div className="flex justify-end"></div>
      </div>
    </div>
  );
}
