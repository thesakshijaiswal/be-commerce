import React from "react";

const ProductCardShimmer = () => {
  return (
    <div className="h-96 w-80 space-y-4 rounded-xl bg-white p-2 text-black duration-300 hover:scale-105">
      <div className="h-56 w-full overflow-hidden rounded-md bg-slate-200"></div>
      <h2 className="mt-3 h-7 rounded-md bg-slate-200"></h2>
      <div className="flex items-center justify-between">
        <div className="h-7 w-32 rounded-md bg-slate-200"></div>
        <div className="h-7 w-20 rounded-md bg-slate-200"></div>
      </div>
      <div className="flex items-center justify-between">
        <div className="h-7 w-24 rounded-md bg-slate-200"></div>
        <div className="h-7 w-32 rounded-md bg-slate-200 px-4 py-[6px]"></div>
      </div>
    </div>
  );
};

export default ProductCardShimmer;
