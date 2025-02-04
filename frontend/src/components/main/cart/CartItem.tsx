import { MdOutlineDelete } from "react-icons/md";
import { FiMinusCircle, FiPlusCircle } from "react-icons/fi";
import { useDispatch } from "react-redux";
import {
  changeQuantity,
  ICart,
  removeFromCart,
} from "@/redux/features/cart/cartSlice";
import toast from "react-hot-toast";

export default function CartItem({ car }: { car: ICart }) {
  const dispatch = useDispatch();
  const { _id, name, price, quantity, stock, image } = car;
  const total = price * quantity;

  const handelDeleteCartItem = (_id: string) => {
    const isConfirm = window.confirm("Are you sure delete this item?");
    if (isConfirm) dispatch(removeFromCart({ _id }));
  };

  const handelIncreaseQuantity = (_id: string) => {
    if (stock > quantity) {
      dispatch(changeQuantity({ _id, quantity: quantity + 1 }));
    } else {
      toast.error("Sorry! Out of stock");
    }
  };

  const handelDecreaseQuantity = (_id: string) => {
    if (quantity > 1) {
      dispatch(changeQuantity({ _id, quantity: quantity - 1 }));
    } else {
      toast.error("Minimum quantity is 1");
    }
  };

  return (
    <tr>
      <td className="p-3">
        <div className="flex items-center gap-2">
          <img
            src={image}
            alt={name}
            className="h-10 w-10 rounded-lg"
            loading="lazy"
          />
          <div className="leading-4">
            <h3 className="text-neutral">
              {name.length > 50 ? `${name.slice(0, 50)}...` : name}
            </h3>
          </div>
        </div>
      </td>

      <td className="px-6 py-2 font-medium">
        <p>৳{price}</p>
      </td>

      <td className="px-6 py-3">
        <div className="flex items-center gap-2">
          <button
            onClick={() => handelDecreaseQuantity(_id)}
            className="text-lg text-neutral-content duration-200 hover:text-neutral"
          >
            <FiMinusCircle />
          </button>
          <div>
            <p className="w-max rounded-lg py-px text-center text-neutral">
              {quantity}
            </p>
          </div>
          <button
            onClick={() => handelIncreaseQuantity(_id)}
            className="text-lg text-neutral-content duration-200 hover:text-neutral"
          >
            <FiPlusCircle />
          </button>
        </div>
      </td>

      <td className="px-6 py-3 font-medium">
        <p>
          ৳<span>{total}</span>
        </p>
      </td>

      <td className="px-6 py-3">
        <button
          onClick={() => handelDeleteCartItem(_id)}
          className="text-xl text-red-600 hover:underline"
        >
          <MdOutlineDelete />
        </button>
      </td>
    </tr>
  );
}
