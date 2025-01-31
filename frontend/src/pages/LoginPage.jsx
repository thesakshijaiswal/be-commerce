import { Link } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../features/userApiSlice";
import { Button } from "../components";
import loginBanner from "../assets/login.svg";
import googleLogo from "../assets/google_signIn.png";
import {
  AiOutlineMail,
  AiOutlineEye,
  AiOutlineEyeInvisible,
} from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("Please enter both email and password.");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.message);
    }
  };

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
                Sign into your Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleLogin}
              >
                <div className="relative">
                  <label
                    htmlFor="email"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Your email
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => {
                      setEmail(e.target.value);
                    }}
                    className="focus:ring-primary-600 focus:border-primary-600 block w-full rounded-lg border border-gray-300 bg-gray-50 p-2.5 pr-10 text-gray-900"
                    placeholder="name@be-commerce.com"
                    required
                  />
                  <AiOutlineMail className="absolute right-3 top-[70%] -translate-y-1/2 text-lg text-gray-500" />
                </div>

                <div className="relative">
                  <label
                    htmlFor="password"
                    className="mb-2 block text-sm font-medium text-gray-900"
                  >
                    Password
                  </label>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    id="password"
                    value={password}
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

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                        required
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <a
                    href="#"
                    className="whitespace-nowrap text-sm font-medium text-secondary/60 hover:underline"
                  >
                    Forgot password?
                  </a>
                </div>
                <Button
                  className="w-full text-sm font-medium"
                  type="submit"
                  onClick={handleLogin}
                  disabled={isLoading}
                >
                  Sign In
                </Button>
                <div className="flex items-center justify-center gap-6">
                  <div className="h-0.5 w-1/2 bg-secondary/15"></div>
                  <span className="text-lg font-medium text-secondary/25">
                    or
                  </span>
                  <div className="h-0.5 w-1/2 bg-secondary/15"></div>
                </div>
                <Button className="w-full text-sm font-medium">
                  <img
                    src={googleLogo}
                    alt="Google Logo"
                    className="mr-2 w-5"
                  />
                  Continue with Google
                </Button>
                <p className="text-sm font-light text-gray-500">
                  Don’t have an account yet?{" "}
                  <Link
                    to="/register"
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Sign up
                  </Link>
                </p>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex md:w-1/2">
        <img src={loginBanner} className="lg:h-[40rem]" alt="Empty cart" />
      </div>
    </div>
  );
};

export default LoginPage;
