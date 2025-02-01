import { Button } from "../components";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from "react-icons/ai";
import resetPasswordBanner from "../assets/reset-password-banner.svg";
const PasswordResetPage = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <div className="flex max-h-screen items-center justify-center font-ubuntu">
      <div className="w-full md:w-1/2">
        <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:rounded-e-full lg:bg-primary/10 lg:py-0">
          <div className="mb-6 flex items-center gap-3 text-2xl font-semibold text-gray-900">
            <img src="../../logo.svg" alt="logo" className="w-12" />
            <h3 className="font-playwrite">BE-Commerce</h3>
          </div>
          <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Reset your Password
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div className="relative">
                  <label
                    htmlFor="Password"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type="Password"
                    name="Password"
                    id="Password"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900"
                    placeholder="••••••••"
                    required
                  />
                </div>

                <div className="relative">
                  <label
                    htmlFor="confirm-password"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Confirm Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="confirm-password"
                    id="confirm-password"
                    onChange={(e) => {
                      setPassword(e.target.value);
                    }}
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900"
                    required
                  />
                  {showPassword ? (
                    <AiOutlineEye
                      className="absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                      onClick={() => setShowPassword(false)}
                    />
                  ) : (
                    <AiOutlineEyeInvisible
                      className="absolute right-3 top-[70%] -translate-y-1/2 cursor-pointer text-xl text-gray-500"
                      onClick={() => setShowPassword(true)}
                    />
                  )}
                </div>

                <Button className="w-full text-sm font-medium" type="submit">
                  Reset Password
                </Button>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex md:w-1/2">
        <img
          src={resetPasswordBanner}
          className="lg:h-[40rem]"
          alt="resetPasswordBanner"
        />
      </div>
    </div>
  );
};

export default PasswordResetPage;
