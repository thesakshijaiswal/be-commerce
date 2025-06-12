import { Button, InputField, AuthLayout } from "../components";
import googleLogo from "../assets/google_signIn.svg";
import { AiOutlineMail, AiOutlineLock } from "react-icons/ai";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { BASE_BACKEND_URL } from "../utils/constants";

const AuthForm = ({
  title,
  submitButtonText,
  altText,
  altLink,
  altLinkText,
  onSubmit,
  isLoading,
  name,
  setName,
  email,
  setEmail,
  password,
  setPassword,
  showPassword,
  setShowPassword,
  showForgotPassword,
  handleForgotPassword,
  isForgotPasswordClicked,
  showNameField,
  showEmailField,
  confirmPassword,
  setConfirmPassword,
  showConfirmPassword,
  setShowConfirmPassword,
  showGoogleOption,
  showConfirmPasswordField,
  banner,
  bannerAlt,
}) => {
  const handleGoogleAuth = (e) => {
    e.preventDefault();
    try {
      window.location.href = `${BASE_BACKEND_URL}/auth/google/callback`;
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <AuthLayout title={title} banner={banner} bannerAlt={bannerAlt}>
      <form action="#" onSubmit={onSubmit}>
        {showNameField && (
          <InputField
            type="text"
            fieldName="name"
            placeholder="sakshi jaiswal"
            label="Name"
            icon={AiOutlineMail}
            value={name}
            onChange={(e) => setName(e.target.value)}
            autoComplete="Name"
          />
        )}
        {showEmailField && (
          <InputField
            type="text"
            fieldName="email"
            placeholder="sakshi@example.com"
            label="Email"
            icon={AiOutlineMail}
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            autoComplete="Email"
          />
        )}

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

        {showConfirmPasswordField && (
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
        )}
        {showForgotPassword && (
          <div className="flex items-center justify-between pt-4">
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
              className={`cursor-pointer whitespace-nowrap text-sm font-medium text-secondary/60 hover:underline ${isForgotPasswordClicked ? "cursor-not-allowed opacity-50" : ""}`}
              onClick={handleForgotPassword}
              disabled={isForgotPasswordClicked}
            >
              Forgot password?
            </p>
          </div>
        )}

        <div className="pt-4">
          <Button
            className="mb-2 w-full text-sm font-medium"
            type="submit"
            disabled={isLoading}
          >
            {submitButtonText}
          </Button>
          {showGoogleOption && (
            <div>
              <div className="flex items-center justify-center gap-6">
                <div className="h-0.5 w-1/2 bg-secondary/15"></div>
                <span className="text-lg font-medium text-secondary/70">
                  or
                </span>
                <div className="h-0.5 w-1/2 bg-secondary/15"></div>
              </div>

              <Button
                className="mt-2 w-full text-sm font-medium"
                onClick={handleGoogleAuth}
              >
                <img src={googleLogo} alt="Google Logo" className="mr-2 w-5" />
                Continue with Google
              </Button>
            </div>
          )}

          <p className="mt-2 text-sm font-light text-gray-700">
            {altText}{" "}
            <Link to={altLink} className="font-medium hover:underline">
              {altLinkText}
            </Link>
          </p>
        </div>
      </form>
    </AuthLayout>
  );
};

export default AuthForm;
