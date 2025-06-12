const ProductDetailsShimmer = () => {
  return (
    <div
      className="my-5 flex min-h-screen animate-pulse flex-col items-center p-4 sm:px-10 md:px-3 lg:px-16"
      role="status"
      aria-busy="true"
    >
      <div className="flex w-full max-w-6xl flex-col gap-6 md:flex-row lg:items-start">
        <div
          className="relative z-10 h-9 w-24 rounded-md bg-slate-300 md:w-56 lg:w-28"
          aria-hidden="true"
        ></div>

        <div className="flex w-full items-center justify-center lg:w-1/2">
          <div
            className="h-80 w-80 rounded-md bg-slate-300 lg:h-96 lg:w-96"
            aria-hidden="true"
          ></div>
        </div>
        <div className="flex w-full flex-col space-y-6 lg:w-1/2">
          {[
            "w-48 sm:w-64",
            "w-36 sm:w-48",
            "w-56 sm:w-64",
            "w-full max-w-md sm:w-96 h-24",
            "w-40 sm:w-64",
            "w-24 sm:w-28",
            "w-36 sm:w-48 h-8",
          ].map((cls, i) => (
            <div
              key={i}
              className={`h-6 rounded-md bg-slate-300 ${cls}`}
              aria-hidden="true"
            ></div>
          ))}
          <div className="flex gap-4 pt-3">
            <div
              className="h-9 w-1/2 rounded-md bg-slate-300"
              aria-hidden="true"
            ></div>
            <div
              className="h-9 w-1/2 rounded-md bg-slate-300"
              aria-hidden="true"
            ></div>
          </div>
        </div>
      </div>

      <div className="mt-24 w-full max-w-6xl">
        <div className="h-56 rounded-md bg-slate-300 p-4 shadow-sm"></div>
      </div>
    </div>
  );
};

export default ProductDetailsShimmer;
