import { Button, InputField } from "../components";
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import toast from "react-hot-toast";
import { HiOutlineUserCircle } from "react-icons/hi2";

const ProfilePage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const handleUpdateProfile = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }
    toast.success("Profile updated successfully!");
  };

  return (
    <div className="flex max-h-screen items-center justify-center font-ubuntu">
      <div className="w-full md:w-2/5">
        <div className="mx-auto flex flex-col items-center justify-center px-2 py-8 md:h-screen lg:rounded-e-3xl lg:bg-primary/10 lg:py-0">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
            <AiOutlineUser className="h-full w-full text-secondary/20" />
          </div>

          <div className="w-full rounded-lg sm:max-w-md md:mt-0 xl:p-0">
            <div className="space-y-4 p-6 sm:p-8 md:space-y-6">
              <form onSubmit={handleUpdateProfile}>
                <InputField
                  type="text"
                  fieldName="name"
                  placeholder="Enter your name"
                  label="Name"
                  icon={AiOutlineUser}
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <InputField
                  type="email"
                  fieldName="email"
                  placeholder="Enter your email"
                  label="Email"
                  icon={AiOutlineMail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                />
                <InputField
                  type={showPassword ? "text" : "password"}
                  fieldName="password"
                  placeholder="Enter your password"
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
                  placeholder="Confirm your password"
                  label="Confirm Password"
                  icon={AiOutlineLock}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  showPassword={showConfirmPassword}
                  setShowPassword={setShowConfirmPassword}
                />
                <div className="pt-4">
                  <Button
                    className="mb-2 w-full text-sm font-medium"
                    type="submit"
                  >
                    Update Profile
                  </Button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
      <div className="hidden w-full items-center justify-center md:flex md:w-3/5"></div>
    </div>
  );
};

export default ProfilePage;
