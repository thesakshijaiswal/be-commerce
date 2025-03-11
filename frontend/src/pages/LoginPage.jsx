import { useEffect, useState } from "react";
import {
  useLoginMutation,
  useForgotPasswordMutation,
} from "../features/userApiSlice";
import SignInBanner from "../assets/SignIn-banner.svg";
import { useDispatch, useSelector } from "react-redux";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthForm } from "../components";
import { useLocation } from "react-router-dom";

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

  const { userInfo } = useSelector((state) => state.user);
  const { search } = useLocation();
  const searchParam = new URLSearchParams(search);
  const redirect = searchParam.get("redirect") || "/";

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, userInfo, redirect]);
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
      setTimeout(() => setIsForgotPasswordClicked(false), 5000); // Re-enable forget pass btn after 5 sec
    }
  };

  return (
    <AuthForm
      title="Sign into your Account"
      submitButtonText="Sign In"
      altText="Don’t have an account yet?"
      altLink="/signUp"
      altLinkText="Sign up"
      onSubmit={handleLogin}
      isLoading={isLoading}
      email={email}
      setEmail={setEmail}
      showEmailField={true}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPasswordField={false}
      showForgotPassword={true}
      handleForgotPassword={handleForgotPassword}
      isForgotPasswordClicked={isForgotPasswordClicked}
      showGoogleOption={true}
      showNameField={false}
      banner={SignInBanner}
      bannerAlt="SignInBanner"
    />
  );
};

export default LoginPage;
