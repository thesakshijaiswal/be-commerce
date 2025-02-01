import { Link } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../features/userApiSlice";
import { Branding, Button, InputField } from "../components";
import loginBanner from "../assets/login-banner.svg";
import googleLogo from "../assets/google_signIn.svg";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../features/userApiSlice";

const LoginPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, { isLoading: isLoadingPassword }] =
    useForgotPasswordMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!formData.email.trim() || !formData.password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await login(formData).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleForgotPassword = async () => {
    if (!formData.email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    try {
      const res = await forgotPassword({ email: formData.email }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };
  
  return (
    <div className="flex max-h-screen items-center justify-center font-ubuntu">
      <div className="w-full md:w-1/2">
        <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:rounded-e-full lg:bg-primary/10 lg:py-0">
          <Branding className="text-2xl font-semibold text-gray-900" />
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
                <InputField
                  type="text"
                  fieldName="email"
                  placeholder="sakshi@example.com"
                  label="Email"
                  icon={AiOutlineMail}
                  formData={formData}
                  setFormData={setFormData}
                />
                <InputField
                  type={showPassword ? "text" : "password"}
                  fieldName="password"
                  placeholder="••••••••"
                  label="Password"
                  icon={AiOutlineLock}
                  formData={formData}
                  setFormData={setFormData}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />

                <div className="flex items-center justify-between">
                  <div className="flex items-start">
                    <div className="flex h-5 items-center">
                      <input
                        id="remember"
                        aria-describedby="remember"
                        type="checkbox"
                        className="focus:ring-3 focus:ring-primary-300 h-4 w-4 rounded border border-gray-300 bg-gray-50"
                      />
                    </div>
                    <div className="ml-3 text-sm">
                      <label className="text-gray-500" htmlFor="remember">
                        Remember me
                      </label>
                    </div>
                  </div>
                  <p
                    className="cursor-pointer whitespace-nowrap text-sm font-medium text-secondary/60 hover:underline"
                    onClick={handleForgotPassword}
                  >
                    Forgot password?
                  </p>
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
        <img src={loginBanner} className="lg:h-[40rem]" alt="loginBanner" />
      </div>
    </div>
  );
};

export default LoginPage;
