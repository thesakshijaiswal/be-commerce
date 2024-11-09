import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useState } from "react";
import { FaX } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "./Button";
import Profile from "./Profile";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  return (
    <nav className="bg-first p-2">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="../../logo.svg" alt="BE-commerce" className="w-14" />
            <a href="/" className="font-playwrite text-xl font-bold">
              BE Commerce
            </a>
          </div>

          <div className="hidden items-center md:flex">
            <input
              type="text"
              placeholder="Search"
              className="w-96 rounded-md p-1 pl-5 font-normal text-black outline-none"
            />
            <Button btnIcon={IoSearch}></Button>
          </div>

          <div className="hidden gap-5 lg:flex">
            <ul className="flex gap-8">
              <li className="flex items-center">
                <IoCartOutline className="mr-2 h-9 w-9" />
                Cart
              </li>
              <li className="flex items-center" onClick={toggleProfile}>
                <HiOutlineUserCircle className="mr-2 h-8 w-8" />
                Profile
              </li>
            </ul>
            <Button btnText={"Login"}></Button>
          </div>

          <div className="lg:hidden">
            <button
              onClick={toggleMenu}
              className={`transform text-2xl transition-transform duration-300 ease-in-out lg:hidden ${
                isMenuOpen ? "rotate-180" : ""
              }`}
            >
              {isMenuOpen ? <FaX /> : <BsThreeDotsVertical />}
            </button>
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } bg-first mt-4 rounded-md p-4 transition-all duration-500 lg:hidden`}
        >
          <div className="flex flex-col items-center justify-center gap-4">
            <div className="flex items-center gap-2 md:hidden">
              <input
                type="text"
                placeholder="Search"
                className="rounded-md p-1 font-medium text-black"
              />
              <Button btnIcon={IoSearch}></Button>
            </div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center">
                <IoCartOutline className="mr-2 h-9 w-9" />
                Cart
              </li>
              <li className="flex items-center" onClick={toggleProfile}>
                <HiOutlineUserCircle className="ml-1 mr-3 h-8 w-8" />
                Profile
              </li>
            </ul>
            <Button btnText={"Login"} className="w-72"></Button>
          </div>
        </div>
        {isProfileOpen && <Profile onClose={toggleProfile} />}
      </div>
    </nav>
  );
};

export default Header;
