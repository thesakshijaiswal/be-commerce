import { useState } from "react";
import { AuthLayout, Button, InputField } from "../components";
import { FaRegAddressCard } from "react-icons/fa";
import { PiCityDuotone, PiMailbox } from "react-icons/pi";
import { SlLocationPin } from "react-icons/sl";
import checkoutBanner from "../assets/checkout-Banner.svg";

const ShippingPage = () => {
  const [address, setAddress] = useState("");
  const [postalCode, setPostalCode] = useState("");
  const [city, setCity] = useState("");
  const [country, setCountry] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
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
        />
        <div className="pt-4">
          <Button className="mb-2 w-full text-sm font-medium" type="submit">
            Continue To Payment
          </Button>
        </div>
      </form>
    </AuthLayout>
  );
};

export default ShippingPage;
