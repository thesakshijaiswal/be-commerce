import { Link } from "react-router-dom";
import { useState } from "react";
import { useLoginMutation } from "../features/userApiSlice";
import { Branding, Button, InputField } from "../components";
import SignInBanner from "../assets/SignIn-banner.svg";
import googleLogo from "../assets/google_signIn.svg";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useForgotPasswordMutation } from "../features/userApiSlice";

const LoginPage = () => {
  const [isForgotPasswordClicked, setIsForgotPasswordClicked] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [login, { isLoading }] = useLoginMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [forgotPassword, { isLoading: isLoadingPassword }] =
    useForgotPasswordMutation();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!email.trim() || !password.trim()) {
      toast.error("All fields are required");
      return;
    }

    try {
      const res = await login({ email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Logged in successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  const handleForgotPassword = async () => {
    if (!email.trim()) {
      toast.error("Please enter your email");
      return;
    }

    if (isForgotPasswordClicked) return; // Debounce Forget password clicks

    setIsForgotPasswordClicked(true);

    try {
      const res = await forgotPassword({ email }).unwrap();
      toast.success(res.message);
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    } finally {
      setTimeout(() => setIsForgotPasswordClicked(false), 5000); // Re-enable after 5 sec
    }
  };

  return (
    <div className="flex max-h-screen items-center justify-center font-ubuntu">
      <div className="w-full md:w-3/5">
        <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:rounded-e-full lg:bg-primary/10 lg:py-0">
          <Branding className="text-2xl font-semibold text-gray-900" />
          <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <h1 className="text-center text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl">
                Sign into your Account
              </h1>
              <form action="#" onSubmit={handleLogin}>
                <InputField
                  type="text"
                  fieldName="email"
                  placeholder="sakshi@example.com"
                  label="Email"
                  icon={AiOutlineMail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />

                <InputField
                  type={showPassword ? "text" : "password"}
                  fieldName="password"
                  placeholder="••••••••"
                  label="Password"
                  icon={AiOutlineLock}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  showPassword={showPassword}
                  setShowPassword={setShowPassword}
                />
                <div className="flex items-center justify-between py-4">
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

                <div className="space-y-3">
                  <Button
                    className="w-full text-sm font-medium"
                    type="submit"
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
                      to="/signUp"
                      className="text-primary-600 font-medium hover:underline"
                    >
                      Sign up
                    </Link>
                  </p>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex md:w-2/5">
        <img src={SignInBanner} className="lg:h-[40rem]" alt="SignInBanner" />
      </div>
    </div>
  );
};

export default LoginPage;
