import { BiArrowBack } from "react-icons/bi";
import { Link, useNavigate, useParams } from "react-router-dom";
import moment from "moment";
import {
  useDeleteOrderMutation,
  useGetOrderByIdQueryQuery,
  useStatusUpdateMutation,
} from "@/redux/features/orderApi";
import toast from "react-hot-toast";
import { IOrder } from "@/interface/orderInterface";
import { TResponse } from "@/interface/globalInterface";

export default function OrderDetails() {
  const params = useParams();
  const id = params.id;
  const navigate = useNavigate();

  const { data, isLoading } = useGetOrderByIdQueryQuery(id);
  const order: IOrder = data?.data;
  const cars = order?.cars;

  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (id: string) => {
    const isConfirm = window.confirm("Do you want to delete this order?");

    if (isConfirm) {
      const result = (await deleteOrder(id)) as TResponse;
      if (result?.data?.success) {
        toast.success(result?.data?.message);
        navigate("/admin/order/all");
      } else {
        toast.error(result?.error?.data?.message || "Something went wrong");
        console.log(result);
      }
    }
  };

  const [statusUpdate, { isLoading: statusLoading }] =
    useStatusUpdateMutation();

  if (isLoading) return "Loading...";

  return (
    <section>
      <div className="flex items-start justify-between">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
          <Link
            to="/admin/order/all"
            className="primary_btn flex w-max items-center gap-2 text-xs"
          >
            <BiArrowBack /> Go Back
          </Link>

          <div>
            <h1 className="text-xs text-primary">order/order-details</h1>
            <p>Order: #{order?._id}</p>
          </div>
        </div>

        <button
          onClick={() => deleteOrderHandler(order?._id)}
          className="whitespace-nowrap rounded bg-red-500 px-4 py-2 text-sm text-base-100"
        >
          Delete order
        </button>
      </div>

      <div className="mt-4 rounded-md border bg-base-100 p-4">
        <div className="flex flex-col items-start justify-between gap-3 sm:flex-row">
          <div>
            <h2 className="text-xl">#{order?._id}</h2>
            <p className="mt-1 w-max rounded bg-green-100 px-2 py-1 text-[11px] text-primary">
              {order?.status}
            </p>
            <div className="gap-2 sm:flex">
              <p className="mt-1 w-max rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                Placed On:{" "}
                {moment(order?.createdAt).format("Do MMMM YYYY hh:mm a")}
              </p>
              <p className="mt-1 w-max rounded bg-primary/10 px-2 py-1 text-[11px] text-primary">
                Updated:{" "}
                {moment(order?.updatedAt).format("Do MMMM YYYY hh:mm a")}
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {statusLoading ? (
              "Loading..."
            ) : (
              <select
                value={order?.status}
                onChange={async (e) => {
                  const res = await statusUpdate({
                    id: order?._id,
                    status: e.target.value,
                  });
                  if (res?.data?.success) {
                    toast.success("Status updated");
                  } else {
                    toast.error("Something went wrong");
                  }
                }}
                className={`cursor-pointer rounded border bg-transparent p-1 text-xs ${
                  order?.status == "pending" &&
                  "border-yellow-500 text-yellow-500"
                }${
                  order?.status == "paid" && "border-green-400 text-green-400"
                } ${
                  order?.status == "shipped" && "border-blue-400 text-blue-400"
                } ${
                  order?.status == "delivered" &&
                  "border-green-400 text-green-400"
                } ${
                  order?.status == "cancelled" && "border-red-400 text-red-400"
                }`}
              >
                <option value="pending">Pending</option>
                <option value="paid">Paid</option>
                <option value="shipped">Shipped</option>
                <option value="delivered">Delivered</option>
                <option value="cancelled">Cancelled</option>
              </select>
            )}
          </div>
        </div>
      </div>

      <div className="mt-4 grid gap-4 sm:grid-cols-2 md:grid-cols-3">
        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Customer Info</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>Name: {order?.user?.name}</p>
            <p>Email: {order?.user?.email}</p>
            <p>Phone: {order?.shippingInfo?.phone}</p>
            <p>Payment: {order?.transaction.method}</p>
          </div>
        </div>

        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Shipping Address</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>{order?.shippingInfo?.address}</p>
          </div>
        </div>

        <div className="rounded-md border bg-base-100 p-2">
          <h2 className="text-lg font-medium">Shipping Note</h2>

          <div className="mt-3 flex flex-col gap-1 text-[15px] text-neutral">
            <p>{order?.shippingInfo?.note}</p>
          </div>
        </div>
      </div>

      <div className="mt-4 rounded-md border bg-base-100 p-4">
        <h2 className="text-lg">Ordered Items</h2>

        <div className="relative mt-2 overflow-x-auto rounded-md border">
          <table>
            <thead>
              <tr>
                <th>SL</th>
                <th>Product</th>
                <th>Quantity</th>
                <th>Price</th>
                <th>Total</th>
              </tr>
            </thead>
            <tbody>
              {cars?.map((car, i) => {
                const totalPrice = car?.quantity * car?.car?.price;

                return (
                  <tr key={order?._id}>
                    <td>{i + 1}</td>
                    <td>
                      <div className="flex items-center gap-2">
                        <img
                          src={`${import.meta.env.VITE_BACKEND_URL}/${
                            car?.car?.image
                          }`}
                          alt={car?.car?.name}
                          className="h-9 w-9 rounded-full"
                          loading="lazy"
                        />

                        <p>{car?.car?.name}</p>
                      </div>
                    </td>
                    <td>{car?.quantity}</td>
                    <td>
                      <p>{car?.car?.price}</p>
                    </td>
                    <td>{totalPrice}TK</td>
                  </tr>
                );
              })}
            </tbody>
            <tfoot>
              <tr>
                <th colSpan={4} className="text-end">
                  Total
                </th>
                <th>{order?.totalPrice}TK</th>
              </tr>
            </tfoot>
          </table>
        </div>
      </div>
    </section>
  );
}
