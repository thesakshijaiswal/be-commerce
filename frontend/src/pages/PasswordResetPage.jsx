import { useState } from "react";
import resetPasswordBanner from "../assets/reset-password-banner.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../features/userApiSlice";
import toast from "react-hot-toast";
import { AuthForm } from "../components";

const PasswordResetPage = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();

    if (!password || !confirmPassword) {
      toast.error("Please fill in both fields");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      await resetPassword({ resetToken, password }).unwrap();
      toast.success("Password reset successfully");
      navigate("/");
    } catch (error) {
      toast.error(error?.data?.message || "Failed to reset password");
    }
  };

  return (
    <div className="flex max-h-screen items-center justify-center font-ubuntu">
      <AuthForm
        title="Reset your Password"
        submitButtonText="Reset Password"
        onSubmit={handleResetPassword}
        isLoading={false}
        password={password}
        setPassword={setPassword}
        showPassword={showPassword}
        setShowPassword={setShowPassword}
        confirmPassword={confirmPassword}
        setConfirmPassword={setConfirmPassword}
        showConfirmPassword={showConfirmPassword}
        setShowConfirmPassword={setShowConfirmPassword}
        showConfirmPasswordField={true}
        showForgotPassword={false}
        showGoogleOption={false}
        showEmailField={false}
      />
      <div className="hidden w-full items-center justify-center md:flex md:w-2/5">
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
