import { useState } from "react";
import { useSignUpMutation } from "../features/userApiSlice";
import SignUpBanner from "../assets/signUp-banner.svg";
import { useDispatch } from "react-redux";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { AuthForm } from "../components";

const SignUpPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [signUp, { isLoading }] = useSignUpMutation();

  const handleSignUp = async (e) => {
    e.preventDefault();
    const normalizedEmail = email.trim().toLowerCase();

    if (!name || !normalizedEmail || !password) {
      toast.error("All fields are required!");
      return;
    }

    const emailRegex =
      /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9-]+\.(com|net|org|edu|gov|co|in|io|me|dev|tech|ai)$/i;

    if (!emailRegex.test(normalizedEmail)) {
      toast.error("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      toast.error("Password must be at least 8 characters long.");
      return;
    }

    try {
      const res = await signUp({
        name,
        email: normalizedEmail,
        password,
      }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Signed up successfully");
    } catch (error) {
      toast.error(
        error?.data?.message ||
          error?.error ||
          "Something went wrong. Please try again.",
      );
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      submitButtonText="Sign Up"
      altText="Already have an account?"
      loadingText="Signing Up..."
      altLink="/login"
      altLinkText="Sign In"
      onSubmit={handleSignUp}
      isLoading={isLoading}
      name={name}
      setName={setName}
      email={email}
      setEmail={setEmail}
      showEmailField={true}
      password={password}
      setPassword={setPassword}
      showPassword={showPassword}
      setShowPassword={setShowPassword}
      showConfirmPasswordField={false}
      showForgotPassword={false}
      showNameField={true}
      showGoogleOption={true}
      banner={SignUpBanner}
      bannerAlt="SignUpBanner"
    />
  );
};

export default SignUpPage;
