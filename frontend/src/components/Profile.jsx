import Button from "./Button";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { FaX } from "react-icons/fa6";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useLogoutMutation } from "../features/userApiSlice";
import { logout } from "../features/userSlice";

const Profile = ({ onClose }) => {
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [logoutApi] = useLogoutMutation();

  const handleLogout = async () => {
    try {
      await logoutApi().unwrap();
      dispatch(logout());
      onClose(); //close profile popup when user is logged out
      navigate("/login");
      toast.success("Logged Out Successfully");
    } catch (error) {
      toast.error(error?.data?.message || error?.error);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-hidden bg-black bg-opacity-50 backdrop-blur-sm">
      <div className="flex w-80 flex-col items-center justify-center rounded-md bg-gray-100 p-6 text-black shadow-lg">
        <div
          className="relative left-32 h-6 w-6 cursor-pointer"
          onClick={onClose}
        >
          <FaX />
        </div>
        <HiOutlineUserCircle className="ml-1 mr-3 h-14 w-14" />
        <h2 className="mb-4 text-xl font-bold">Profile</h2>
        <p className="mb-4 text-base">{userInfo?.name}</p>
        <Button
          className="w-64 pl-1"
          btnIcon={HiOutlineLogout}
          onClick={handleLogout}
        >
          Logout
        </Button>
      </div>
    </div>
  );
};

export default Profile;
