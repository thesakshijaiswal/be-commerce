import { BsCurrencyRupee } from "react-icons/bs";
import Button from "./Button";
import { useDispatch } from "react-redux";
import { removeFromCart } from "../features/shoppingCartSlice";
import toast from "react-hot-toast";

const CartItem = ({ _id, image, name, price, quantity }) => {
  const dispatch = useDispatch();
  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id));
    toast.success("Item removed from cart!");
  };
  return (
    <div className="items-center space-y-4 rounded-lg bg-primary/5 p-4 lg:flex">
      <div className="mr-4 h-48 w-52 object-cover">
        <img src={image} alt={name} className="h-full w-full rounded-md" />
      </div>
      <div className="flex flex-col gap-2 lg:w-1/2">
        <h3 className="text-base font-semibold">{name}</h3>
        <div className="flex items-center font-medium">
          <BsCurrencyRupee />
          <p className="font-medium text-tertiary">{price.toFixed(2)}</p>{" "}
          <span className="mx-1 h-5 w-0.5 bg-gray-600"></span>
          <p className="whitespace-nowrap text-tertiary">
            Quantity: {quantity}
          </p>
        </div>
        <Button
          className="sm:w-52 md:w-36"
          onClick={() => handleRemoveItem(_id)}
        >
          Remove
        </Button>
      </div>
    </div>
  );
};

export default CartItem;
