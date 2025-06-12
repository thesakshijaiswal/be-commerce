import { useState } from "react";
import { AuthLayout, Button, InputField } from "../components";
import { FaRegAddressCard } from "react-icons/fa";
import { PiCityDuotone, PiMailbox } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import checkoutBanner from "../assets/checkout-Banner.svg";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { saveShippingAddress } from "../features/shoppingCartSlice";

const ShippingPage = () => {
  const cart = useSelector((state) => state.cart);
  const { shippingAddress } = cart;
  const [address, setAddress] = useState(shippingAddress?.address || "");
  const [city, setCity] = useState(shippingAddress?.city || "");
  const [postalCode, setPostalCode] = useState(
    shippingAddress?.postalCode || "",
  );
  const [country, setCountry] = useState(shippingAddress?.country || "");
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(saveShippingAddress({ address, city, postalCode, country }));
    navigate("/payment");
  };

  return (
    <AuthLayout
      title="Shipping Information"
      banner={checkoutBanner}
      bannerAlt="checkoutBanner"
    >
      <form action="#" onSubmit={handleSubmit}>
        <InputField
          type="text"
          fieldName="address"
          placeholder="123 Main Street"
          label="Address"
          icon={FaRegAddressCard}
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          autoComplete="Address"
        />
        <InputField
          type="text"
          fieldName="city"
          placeholder="Amravati"
          label="City"
          icon={PiCityDuotone}
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <InputField
          type="text"
          fieldName="postalCode"
          placeholder="223012"
          label="Postal Code"
          icon={PiMailbox}
          value={postalCode}
          onChange={(e) => setPostalCode(e.target.value)}
        />
        <InputField
          type="text"
          fieldName="country"
          placeholder="India"
          label="Country"
          icon={SlLocationPin}
          value={country}
          onChange={(e) => setCountry(e.target.value)}
          autoComplete="Country"
        />
        <div className="pt-4">
          <Button
            className="mb-2 w-full text-sm font-medium"
            type="submit"
            onClick={handleSubmit}
          >
            Continue To Payment
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ShippingPage;
