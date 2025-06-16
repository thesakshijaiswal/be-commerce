import { Button, InputField, OrderStatusBullet } from "../components";
import EmptyOrderHistory from "../components/EmptyOrderHistory";
import { useState } from "react";
import { AiOutlineMail, AiOutlineLock, AiOutlineUser } from "react-icons/ai";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useGetUserOrdersQuery } from "../features/orderApiSlice";
import { useUpdateUserProfileMutation } from "../features/userApiSlice";
import { setCredentials } from "../features/userSlice";
import { useNavigate } from "react-router-dom";

const ProfilePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { userInfo } = useSelector((state) => state.user);
  const isGoogleUser = userInfo?.isGoogleUser;
  const [name, setName] = useState(userInfo.name);
  const [email, setEmail] = useState(userInfo.email);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const { data: userOrders, isLoading, error } = useGetUserOrdersQuery();
  const [updateUser, { isLoading: isUpdating }] =
    useUpdateUserProfileMutation();

  const handleUpdateProfile = async (e) => {
    e.preventDefault();
    const isNameUnchanged = name.trim() === userInfo.name;
    const isEmailUnchanged = email.trim() === userInfo.email;
    const isPasswordEmpty = password.trim() === "";

    if (isGoogleUser) {
      toast.error("Please log in with email and password to use this feature.");
      return;
    }

    if (isNameUnchanged && isEmailUnchanged && isPasswordEmpty) {
      toast.error("You haven’t changed anything yet");
      return;
    }

    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    try {
      const res = await updateUser({
        _id: userInfo._id,
        name,
        email,
        password: isPasswordEmpty ? undefined : password,
      }).unwrap();

      dispatch(setCredentials({ ...res }));
      toast.success("Profile updated successfully!");
    } catch (err) {
      toast.error(err?.data?.message || "Update failed");
    }
  };

  const handleOrderCardClick = (orderId) => {
    navigate(`/order/${orderId}`);
  };

  if (error) {
    return toast.error(error.message);
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex min-h-screen flex-col font-ubuntu md:flex-row">
      <div className="w-full md:w-2/5">
        <div className="mx-auto flex h-full flex-col items-center justify-center rounded-b-3xl bg-primary/10 px-2 py-8 md:rounded-b-none md:rounded-e-3xl lg:py-0">
          <div className="relative flex h-24 w-24 items-center justify-center overflow-hidden rounded-full bg-white">
            {userInfo?.picture ? (
              <img src={userInfo.picture} alt="Profile-img" />
            ) : (
              <AiOutlineUser className="h-full w-full text-secondary/20" />
            )}
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
                  autoComplete="Name"
                  disabled={isGoogleUser}
                />
                <InputField
                  type="email"
                  fieldName="email"
                  placeholder="Enter your email"
                  label="Email"
                  icon={AiOutlineMail}
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="Email"
                  disabled={isGoogleUser}
                />
                {!isGoogleUser && (
                  <>
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
                  </>
                )}

                <div className="pt-4">
                  <Button
                    className="mb-2 w-full text-sm font-medium"
                    type="submit"
                    onClick={handleUpdateProfile}
                    ariaLabel="Update Profile"
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
          <div
            className={`space-y-4 p-2 ${
              userOrders?.length > 0 ? "md:max-h-[84vh] md:overflow-auto" : ""
            }`}
          >
            {userOrders?.length > 0 ? (
              userOrders.map((order) => (
                <div
                  key={order._id}
                  className="w-full cursor-pointer rounded-2xl border border-gray-200 bg-white p-4 shadow-sm transition hover:shadow-md"
                  onClick={() => handleOrderCardClick(order._id)}
                  role="button"
                  tabIndex={0}
                >
                  <div className="mb-2 text-sm text-secondary/70">
                    <div className="flex justify-between md:justify-between">
                      <span className="font-medium">Order ID: {order._id}</span>
                      <span className="hidden text-xs text-secondary md:inline">
                        Date: {order.createdAt.slice(0, 10)}
                      </span>
                    </div>
                    <div className="mt-1 text-xs text-secondary/60 md:hidden">
                      Date: {order.createdAt.slice(0, 10)}
                    </div>
                  </div>

                  <div className="space-y-3">
                    {order.orderItems.map((item, idx) => (
                      <div key={idx} className="flex items-center gap-4">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="h-16 w-16 rounded-lg"
                        />
                        <div className="flex flex-col">
                          <h4 className="line-clamp-2 text-sm font-semibold text-secondary">
                            {item.name}
                          </h4>
                          <div className="flex items-center gap-2">
                            <span className="text-sm text-secondary">
                              Quantity: {item.quantity}
                            </span>
                            |
                            <span className="text-sm text-secondary">
                              Price: ₹{item.price}
                            </span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="mt-4 flex justify-between text-sm font-medium">
                    <span>Total: ₹{order.totalPrice}</span>
                    <OrderStatusBullet isDelivered={order.isDelivered} />
                  </div>
                </div>
              ))
            ) : (
              <EmptyOrderHistory />
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
