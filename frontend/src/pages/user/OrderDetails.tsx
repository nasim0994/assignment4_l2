import { useParams } from "react-router-dom";
import moment from "moment";
import { useGetOrderByIdQueryQuery } from "@/redux/features/orderApi";
import { IOrder } from "@/interface/orderInterface";

export default function OrderDetails() {
  const { id } = useParams();

  const { data, isLoading, isError } = useGetOrderByIdQueryQuery(id);
  const order: IOrder = data?.data;
  const cars = order?.cars;

  let content = null;
  if (isLoading) content = <p>Loading...</p>;

  if (!isLoading && isError) {
    content = <p className="mt-5 text-red-500">Order get failed</p>;
  }

  if (!isLoading && !isError) {
    content = (
      <div className="p-1 sm:p-4">
        <h1 className="sm:text-2xl font-semibold">
          Order <span className="text-primary">#{order?._id}</span>
        </h1>
        <p className="text-xs text-neutral/70">
          Placed on {moment(order?.createdAt).format("Do MMMM YYYY")}
        </p>

        <div className="mt-8 flex space-x-4">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Delivery Address</h2>
            <p className="text-sm">{order?.user?.name}</p>
            <p className="text-sm">{order?.shippingInfo?.phone}</p>
            <p className="text-sm">{order?.user?.email}</p>
            <p className="text-sm">{order?.shippingInfo?.address}</p>
          </div>
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Payment Info</h2>
            <div className="text-sm">
              <p>transactionId: {order?.transaction?.id}</p>
              <p>Method: {order?.transaction?.method}</p>
              <p>Bank Status: {order?.transaction?.bank_status}</p>
              <p>Amount: {order?.totalPrice}</p>
            </div>
          </div>
        </div>
        <div className="mt-8 flex space-x-4">
          <div className="w-1/2">
            <h2 className="text-lg font-semibold">Order Status</h2>
            <p
              className={`text-sm ${
                order?.status == "pending"
                  ? "text-yellow-500"
                  : order?.status == "paid"
                  ? "text-green-500"
                  : order?.status == "shipped"
                  ? "text-blue-500"
                  : order?.status == "delivered"
                  ? "text-primary"
                  : "text-red-500"
              }`}
            >
              {order?.status}
            </p>
          </div>
        </div>

        {/* product */}
        <div className="my-5 p-5">
          <div className="flex flex-col gap-y-5">
            {cars?.map((car) => (
              <div
                key={car?.car?._id}
                className="flex w-full items-center justify-between gap-4"
              >
                <div className="flex items-center gap-2">
                  <img
                    src={`${import.meta.env.VITE_BACKEND_URL}/${
                      car?.car?.image
                    }`}
                    alt="product"
                    className="h-10 w-10 rounded-full"
                  />
                  <div>
                    <p className="text-base font-semibold">{car?.car?.name}</p>
                  </div>
                </div>
                <div>
                  <p className="text-xs">Category: {car?.car?.category}</p>
                </div>
                <p className="text-sm font-semibold">Qty: {car?.quantity}</p>
              </div>
            ))}
          </div>

          <div className="mt-6 border-t border-black pt-2">
            <div className="mt-2 flex items-center justify-between font-semibold">
              <h1>Total</h1>
              <p>
                ৳<span> {order?.totalPrice}</span>
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return <>{content}</>;
}
