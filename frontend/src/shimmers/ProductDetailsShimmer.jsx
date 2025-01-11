import React from "react";

const ProductDetailsShimmer = () => {
  return (
    <div className="mt-16 flex min-h-screen animate-pulse flex-col items-center p-4 sm:px-10 md:px-3 lg:px-16">
      <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row lg:items-start">
        <div className="relative z-10 h-9 w-24 rounded-md bg-slate-300 md:left-auto md:top-auto md:w-56 lg:w-28"></div>

        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div className="h-80 w-80 rounded-md bg-slate-300 lg:h-96 lg:w-96"></div>
        </div>

        <div className="flex w-full flex-col space-y-6 lg:w-1/2">
          <div className="h-6 w-48 rounded-md bg-slate-300 sm:w-64"></div>
          <div className="h-6 w-36 rounded-md bg-slate-300 sm:w-48"></div>
          <div className="h-6 w-56 rounded-md bg-slate-300 sm:w-64"></div>
          <div className="h-24 w-full max-w-md rounded-md bg-slate-300 sm:w-96"></div>
          <div className="h-6 w-40 rounded-md bg-slate-300 sm:w-64"></div>
          <div className="h-6 w-24 rounded-md bg-slate-300 sm:w-28"></div>
          <div className="h-8 w-36 rounded-md bg-slate-300 sm:w-48"></div>
          <div className="flex gap-4 pt-3">
            <div className="h-9 w-1/2 rounded-md bg-slate-300"></div>
            <div className="h-9 w-1/2 rounded-md bg-slate-300"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsShimmer;
