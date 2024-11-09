import Button from "./Button";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { FaX } from "react-icons/fa6";
const Profile = ({ onClose }) => {
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
        <p className="mb-4 text-base">Sakshi Jaiswal</p>
        <Button btnText={"Logout"} className="w-64 pl-1"></Button>
        <HiOutlineLogout className="relative -top-[1.83rem] left-12 z-50 h-6 w-6 text-white" />
      </div>
    </div>
  );
};

export default Profile;
