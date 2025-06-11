import { BsCurrencyRupee } from "react-icons/bs";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/shoppingCartSlice";
import toast from "react-hot-toast";
import { truncateProductName } from "../utils/helper";
import { RiDeleteBin2Line } from "react-icons/ri";

const CartItem = ({ _id, image, name, price, quantity }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart!");
  };
  return (
    <div className="space-4 flex max-w-screen-md items-center justify-between gap-5 rounded-lg bg-primary/5 p-4">
      <div className="h-36 w-full md:w-28">
        <img
          src={image}
          alt={name}
          className="h-full w-full overflow-hidden rounded-md object-contain mix-blend-multiply"
        />
      </div>
      <div className="flex flex-col overflow-hidden">
        <h3 className="text-base">{truncateProductName(name, 50)}</h3>
        <div className="flex flex-wrap items-center pt-2 text-sm font-medium">
          <BsCurrencyRupee />
          <p className="font-medium text-tertiary">{price.toFixed(2)}</p>{" "}
          <span className="mx-1 h-5 w-0.5 bg-gray-600"></span>
          <p className="whitespace-nowrap text-tertiary">
            Quantity: {quantity}
          </p>
        </div>
      </div>
      <Button
        className="h-24 w-10 !px-2 !py-0"
        onClick={() => handleRemoveItem(_id)}
        btnIcon={RiDeleteBin2Line}
        ariaLabel="Remove Product"
      />
    </div>
  );
};

export default CartItem;
