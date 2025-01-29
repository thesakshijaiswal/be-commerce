import { Button } from "../components";
import login from "../assets/login.svg";
const LoginPage = () => {
  return (
    <div className="flex max-h-screen items-center justify-center font-ubuntu">
      <div className="md:w-1/2">
        <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:rounded-e-full lg:bg-primary/10 lg:py-0">
          <h2 className="mb-6 flex items-center gap-3 text-2xl font-semibold text-gray-900">
            <img src="../../logo.svg" alt="logo" className="w-12" />
            <h3 className="font-playwrite">BE-Commerce</h3>
          </h2>
          <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign into your Account
              </h1>
              <form className="space-y-4 md:space-y-6" action="#">
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                    placeholder="name@company.com"
                    required=""
                  />
                </div>
                <div>
                  <label className="mb-2 block text-sm font-medium text-gray-900">
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="••••••••"
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 text-gray-900"
                    required=""
                  />
                </div>
                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                        required=""
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500">Remember me</label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="text-sm font-medium text-secondary/60 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button className="w-full rounded-lg text-sm font-medium text-white focus:outline-none">
                  Sign In
                </Button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <a
                    href="#"
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Sign up
                  </a>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex md:w-1/2">
        <img src={login} className="lg:h-[40rem]" alt="Empty cart" />
      </div>
    </div>
  );
};

export default LoginPage;
