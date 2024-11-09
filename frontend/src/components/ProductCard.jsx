const ProductCard = ({ image, name }) => {
  return (
    <div className="h-96 w-80 rounded-lg bg-[#323235] p-4 duration-300 hover:scale-105">
      <div className="h-56 w-full overflow-hidden rounded-md">
        <img className="h-full w-full" src={image} alt={name} />
      </div>
      <h2 className="mt-2 truncate text-lg">{name}</h2>
    </div>
  );
};

export default ProductCard;
