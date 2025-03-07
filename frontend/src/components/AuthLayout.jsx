import { Branding } from "../components";
const AuthLayout = ({ title, children }) => {
  return (
    <div className="w-full md:w-3/5">
      <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:rounded-e-full lg:bg-primary/10 lg:py-0">
        <Branding className="text-2xl font-semibold text-gray-900" />
        <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
          <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
            <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
              {title}
            </h1>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthLayout;
