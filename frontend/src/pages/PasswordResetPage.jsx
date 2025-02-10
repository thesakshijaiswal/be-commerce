import { Branding, Button, InputField } from "../components";
import { useState } from "react";
import { AiOutlineLock } from "react-icons/ai";
import resetPasswordBanner from "../assets/reset-password-banner.svg";
import { useParams, useNavigate } from "react-router-dom";
import { useResetPasswordMutation } from "../features/userApiSlice";
import toast from "react-hot-toast";

const PasswordResetPage = () => {
  const { resetToken } = useParams();
  const navigate = useNavigate();
  const [resetPassword] = useResetPasswordMutation();
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState();
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
    } else {
      await resetPassword({ resetToken, password }).unwrap();
      toast.success("Password reset successfully");
      navigate("/");
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
                Reset your Password
              </h1>
              <form
                className="space-y-4 md:space-y-6"
                onSubmit={handleResetPassword}
              >
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
                  onClick={handleResetPassword}
                >
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
