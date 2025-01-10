import React from "react";

const ProductDetailsShimmer = () => {
  return (
    <div className="mt-16 flex min-h-screen flex-col items-center p-4 sm:px-10 md:px-3 lg:px-16">
      <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row lg:items-start">
        <div className="relative z-10 h-6 w-24 rounded-md bg-slate-200 p-5 md:left-auto md:top-auto"></div>
        <div className="flex h-72 items-center justify-center rounded-md bg-slate-200 md:mx-14 md:h-96 md:w-96"></div>
        <div className="flex w-1/3 flex-col space-y-4">
          <h1 className="h-28 w-96 rounded-md bg-slate-200"></h1>
          <p className="h-6 w-56 rounded-md bg-slate-200"></p>
          <div className="h-6 w-64 rounded-md bg-slate-200"></div>
          <p className="h-24 w-96 rounded-md bg-slate-200"></p>
          <div className="h-6 w-64 rounded-md bg-slate-200"></div>
          <div className="h-6 w-28 rounded-md bg-slate-200"></div>
          <div className="h-8 w-48 rounded-md bg-slate-200"></div>
          <div className="flex gap-4 pt-3">
            <div className="h-9 w-1/2 rounded-md bg-slate-200"></div>
            <div className="h-9 w-1/2 rounded-md bg-slate-200"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsShimmer;
