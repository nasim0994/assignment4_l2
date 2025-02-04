import { useState } from "react";
import { Link } from "react-router-dom";
import { AiFillEye, AiOutlineDelete } from "react-icons/ai";
import Pagination from "../../../components/Pagination/Pagination";
import moment from "moment";
import { IOrder } from "@/interface/orderInterface";
import {
  useDeleteOrderMutation,
  useGetAllOrdersQuery,
  useStatusUpdateMutation,
} from "@/redux/features/orderApi";
import toast from "react-hot-toast";
import { TResponse } from "@/interface/globalInterface";

type IQuery = {
  page?: number;
  limit?: number;
};

export default function AllOrders() {
  const [currentPage, setCurrentPage] = useState(1);
  const query: IQuery = {};
  query["page"] = currentPage;
  query["limit"] = 10;

  const { data, isLoading, isError } = useGetAllOrdersQuery(query);
  const orders: IOrder[] = data?.data;

  const [statusUpdate, { isLoading: statusLoading }] =
    useStatusUpdateMutation();

  const [deleteOrder] = useDeleteOrderMutation();

  const deleteOrderHandler = async (id: string) => {
    const isConfirm = window.confirm("Do you want to delete this order?");

    if (isConfirm) {
      const result = (await deleteOrder(id)) as TResponse;
      if (result?.data?.success) {
        toast.success(result?.data?.message);
      } else {
        toast.error(result?.error?.data?.message || "Something went wrong");
        console.log(result);
      }
    }
  };

  let content = null;
  if (isLoading) {
    return (content = <p>Loading...</p>);
  }

  if (!isLoading && !isError && orders?.length > 0) {
    content = orders?.map((order, i) => (
      <tr key={order?._id}>
        <td>{i + 1}</td>
        <td>
          <p>#{order?._id}</p>
          <p className="text-neutral">
            {moment(order?.createdAt).format("DD MMM YYYY")}
          </p>
        </td>
        <td>
          <p>Name: {order?.user?.name}</p>
          <div className="text-sm text-neutral-content">
            <p>Phone: {order?.shippingInfo?.phone}</p>
            <p>Address: {order?.shippingInfo?.address}</p>
          </div>
        </td>
        <td>
          <div className="flex -space-x-4 rtl:space-x-reverse">
            {order?.cars?.map((car, i: number) => (
              <img
                key={i}
                className="h-8 w-8 rounded-full border-2 border-white"
                src={car?.car?.image}
                alt={car?.car?.name}
              />
            ))}
          </div>
        </td>
        <td>{order?.totalPrice}TK</td>
        <td>
          {statusLoading ? (
            "Loading..."
          ) : (
            <select
              value={order?.status}
              onChange={async (e) => {
                const res = (await statusUpdate({
                  id: order?._id,
                  status: e.target.value,
                })) as TResponse;
                if (res?.data?.success) {
                  toast.success("Status updated");
                } else {
                  toast.error(
                    res?.error?.data?.message || "Something went wrong"
                  );
                  console.log(res);
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
        </td>
        <td>
          <div className="flex gap-3">
            <Link
              to={`/admin/order/${order?._id}`}
              className="hover:text-blue-700"
            >
              <AiFillEye />
            </Link>
            <button
              onClick={() => deleteOrderHandler(order?._id)}
              className="hover:text-red-700"
            >
              <AiOutlineDelete />
            </button>
          </div>
        </td>
      </tr>
    ));
  }

  return (
    <section>
      <div className="mb-2 rounded bg-base-100 p-3">
        <h2 className="text-xl text-neutral">All Orders</h2>
      </div>
      <div className="relative flex flex-col justify-between overflow-x-auto pb-4 shadow-lg">
        <table>
          <thead>
            <tr>
              <th>SL</th>
              <th>Order</th>
              <th>Customer</th>
              <th>Products</th>
              <th>Total Price</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>

        {data?.meta?.pages > 1 && (
          <Pagination
            pages={data?.meta?.pages}
            currentPage={currentPage}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </section>
  );
}
