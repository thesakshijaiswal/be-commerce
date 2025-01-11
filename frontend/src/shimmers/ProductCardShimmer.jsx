const ProductCardShimmer = () => {
  return (
    <div className="h-[24.4rem] w-80 animate-pulse space-y-4 rounded-xl bg-white p-4 text-black shadow-sm duration-300 hover:scale-105">
      <div className="h-56 w-72 overflow-hidden rounded-lg bg-slate-300 p-3"></div>
      <h2 className="mt-3 h-7 rounded-md bg-slate-300"></h2>
      <div className="flex items-center justify-between">
        <div className="h-7 w-32 rounded-md bg-slate-300"></div>
        <div className="h-7 w-20 rounded-md bg-slate-300"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-7 w-24 rounded-md bg-slate-300"></div>
        <div className="mr-5 h-7 w-32 rounded-md bg-slate-300 px-8 py-4"></div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
