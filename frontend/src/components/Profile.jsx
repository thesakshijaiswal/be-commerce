import React from 'react'
import Button from "./Button";
import { HiOutlineUserCircle } from "react-icons/hi2";
import { HiOutlineLogout } from "react-icons/hi";
import { FaX } from "react-icons/fa6";
const Profile = ({ onClose }) => {
    return (
      <div className="fixed inset-0 overflow-y-hidden flex items-center justify-center bg-black bg-opacity-50 backdrop-blur-sm z-50">
        <div className="bg-gray-100 shadow-lg rounded-md p-6 w-80 text-black flex justify-center items-center flex-col">
        <div className='w-6 h-6 relative left-32 cursor-pointer' onClick={onClose}><FaX /></div>
        <HiOutlineUserCircle className="ml-1 mr-3 h-14 w-14" />
          <h2 className="font-bold text-xl mb-4">Profile</h2>
          <p className="text-base mb-4">Sakshi Jaiswal</p>
          <Button btnText={"Logout"} className="w-64 pl-1"></Button>
          <HiOutlineLogout className='relative z-50 left-12 -top-[1.83rem] text-white h-6 w-6' />
        </div>
      </div>
    );
  };
  
  export default Profile;
  