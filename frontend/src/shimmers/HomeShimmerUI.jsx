import ProductCardShimmer from "./ProductCardShimmer";
const HomeShimmerUI = () => {
  const shimmerCards = Array(10).fill(0);
  return (
    <div className="flex flex-wrap justify-center gap-x-5 gap-y-8">
      {shimmerCards.map((_, index) => (
        <ProductCardShimmer key={index} />
      ))}
    </div>
  );
};

export default HomeShimmerUI;
