import React from "react";

const ProductCardShimmer = () => {
  return (
    <div className="h-96 w-80 animate-pulse space-y-4 rounded-xl bg-white p-4 text-black duration-300 hover:scale-105">
      <div className="h-56 w-full overflow-hidden rounded-md bg-slate-300"></div>
      <h2 className="mt-3 h-7 rounded-md bg-slate-300"></h2>
      <div className="flex items-center justify-between">
        <div className="h-7 w-32 rounded-md bg-slate-300"></div>
        <div className="h-7 w-20 rounded-md bg-slate-300"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-7 w-24 rounded-md bg-slate-300"></div>
        <div className="h-7 w-32 rounded-md bg-slate-300 px-8 py-4"></div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
