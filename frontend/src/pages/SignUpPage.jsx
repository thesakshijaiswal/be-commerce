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
    try {
      const res = await signUp({ name, email, password }).unwrap();
      dispatch(setCredentials({ ...res }));
      navigate("/");
      toast.success("Signed up successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <AuthForm
      title="Create an Account"
      submitButtonText="Sign Up"
      altText="Already have an account?"
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
