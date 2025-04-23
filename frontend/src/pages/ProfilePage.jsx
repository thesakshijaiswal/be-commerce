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
    <div className="flex max-h-screen flex-col items-center justify-center font-ubuntu md:flex-row">
      <div className="w-full md:w-2/5">
        <div className="mx-auto flex flex-col items-center justify-center rounded-b-3xl bg-primary/10 px-2 py-8 md:h-screen md:rounded-b-none md:rounded-e-3xl lg:py-0">
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
      <div className="w-full text-secondary md:w-3/5">
        <div className="mt-8 w-full max-w-6xl p-4">
          <h3 className="mb-4 text-2xl font-semibold">Order History</h3>
          <table className="w-full table-auto text-left text-sm sm:text-base">
            <thead>
              <tr className="border-b">
                <th className="px-1 py-2 sm:px-3">Order ID</th>
                <th className="px-1 py-2 text-center sm:px-3">Date</th>
                <th className="px-1 py-2 text-right sm:px-3">Total</th>
                <th className="px-1 py-2 text-right sm:px-3">Order Status</th>
              </tr>
            </thead>
            <tbody></tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
