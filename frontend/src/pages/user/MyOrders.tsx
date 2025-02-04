import { FaEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import moment from "moment";
import { useAppSelector } from "@/redux/hook/hooks";
import { useGetMyOrdersQuery } from "@/redux/features/orderApi";
import { IOrder } from "@/interface/orderInterface";

export default function MyOrders() {
  const { loggedUser } = useAppSelector((state) => state.auth);
  const userId = loggedUser?._id;

  const { data, isLoading, isError } = useGetMyOrdersQuery(userId);
  const orders: IOrder[] = data?.data;

  let content = null;
  if (isLoading) {
    content = <p>Loading...</p>;
  }

  if (!isLoading && isError) {
    content = <p className="mt-5 text-red-500">Order get failed</p>;
  }
  if (!isLoading && !isError) {
    content = orders?.map((order) => (
      <tr key={order?._id}>
        <td>
          <div className="w-max">
            <Link to={`/user/my-order/${order?._id}`}>
              <span className="text-primary">#{order?._id}</span>
            </Link>
            <p className="text-xs text-neutral/70">
              Placed on: {moment(order?.createdAt).format("Do MMMM YYYY")}
            </p>
          </div>
        </td>
        <td>{order?.totalPrice}TK</td>
        <td>
          <p>Method: {order?.transaction?.method}</p>
          <p>transactionId: {order?.transaction?.id}</p>
        </td>
        <td
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
        </td>
        <td>
          <Link to={`/user/my-order/${order?._id}`}>
            <FaEye />
          </Link>
        </td>
      </tr>
    ));
  }

  return (
    <section>
      <div className="mb-3 border-b pb-1">
        <h3>All Orders</h3>
      </div>

      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr>
              <th className="px-4">Order Id</th>
              <th className="px-4">Total Price</th>
              <th className="px-4"> Payment</th>
              <th className="px-4"> Status</th>
              <th className="px-4"> Action</th>
            </tr>
          </thead>
          <tbody>{content}</tbody>
        </table>
      </div>
    </section>
  );
}
