const ProductCard = ({ image, name }) => {
  return (
    <div className="h-72 w-72 rounded-md bg-[#323235] p-4">
      <div className="h- w-full overflow-hidden rounded-md">
        <img className="h-full w-full" src={image} alt={name} />
      </div>
      <h2 className="mt-2 truncate text-lg">{name}</h2>
    </div>
  );
};

export default ProductCard;
