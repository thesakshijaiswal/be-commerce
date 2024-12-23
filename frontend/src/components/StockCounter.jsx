import React, { useState } from "react";
import Button from "../components/Button";

const StockCounter = ({
  countInStock,
  initialQuantity = 1,
  onQuantityChange,
}) => {
  const [quantity, setQuantity] = useState(initialQuantity);

  const handleDecrement = () => {
    const newQuantity = Math.max(1, quantity - 1);
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity);
  };

  const handleIncrement = () => {
    const newQuantity = Math.min(countInStock, quantity + 1);
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity);
  };

  const handleInputChange = (value) => {
    const newQuantity = Math.min(countInStock, Math.max(1, +value || 1));
    setQuantity(newQuantity);
    if (onQuantityChange) onQuantityChange(newQuantity);
  };

  return (
    <div className="flex gap-2">
      <Button
        onClick={handleDecrement}
        disabled={quantity <= 1 || countInStock === 0}
      >
        -
      </Button>
      <input
        className="no-arrows w-20 appearance-none rounded-md bg-secondary/10 text-center"
        id="quantity"
        type="number"
        value={countInStock === 0 ? 0 : quantity}
        min="1"
        max={countInStock}
        onChange={(e) => handleInputChange(e.target.value)}
        disabled={countInStock === 0}
      />
      <Button
        onClick={handleIncrement}
        disabled={quantity >= countInStock || countInStock === 0}
      >
        +
      </Button>
    </div>
  );
};

export default StockCounter;
