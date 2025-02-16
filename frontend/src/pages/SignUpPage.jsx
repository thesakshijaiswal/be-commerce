import { Link } from "react-router-dom";
import { useState } from "react";
import { useSignUpMutation } from "../features/userApiSlice";
import { Branding, Button, InputField } from "../components";
import loginBanner from "../assets/login-banner.svg";
import googleLogo from "../assets/google_signIn.svg";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [signUp, { isLoading }] = useSignUpMutation();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleSignUp = async (e) => {
    e.preventDefault();

    if (password !== confirmPassword) {
      toast.error("Passwords do not match!");
      return;
    } else {
      try {
        const res = await signUp({ name, email, password }).unwrap();
        dispatch(setCredentials({ ...res }));
        navigate("/");
        toast.success("Signed up successfully");
      } catch (error) {
        toast.error(error?.data?.message || error?.error);
      }
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
                Create an Account
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                action="#"
                onSubmit={handleSignUp}
              >
                <InputField
                  type="text"
                  fieldName="name"
                  placeholder="sakshi jaiswal"
                  label="Name"
                  icon={AiOutlineMail}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
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
                <InputField
                  type={showConfirmPassword ? "text" : "password"}
                  fieldName="confirmPassword"
                  placeholder="••••••••"
                  label="Confirm Password"
                  icon={AiOutlineLock}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />

                <Button
                  className="w-full text-sm font-medium"
                  type="submit"
                  disabled={isLoading}
                >
                  Sign Up
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
                  Already have an account yet?{" "}
                  <Link
                    to="/login"
                    className="text-primary-600 font-medium hover:underline"
                  >
                    Sign In
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

export default SignUpPage;
