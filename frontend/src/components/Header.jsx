import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { FaX } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "./Button";
import Profile from "./Profile";
import { Link } from "react-router-dom";
import { useSelector } from "react-redux";
const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const { cartItems } = useSelector((state) => state.cart);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth >= 1024) {
        setIsMenuOpen(false);
      }
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const toggleProfile = () => {
    setIsProfileOpen(!isProfileOpen);
  };

  const NavItem = ({ to, icon: Icon, label, onClick }) => (
    <Link
      to={to}
      className="flex cursor-pointer items-center"
      onClick={onClick}
    >
      <Icon className="mr-2 h-8 w-8" />
      {label}
    </Link>
  );
  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <nav className="bg-primary p-2">
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center font-playwrite text-xl font-bold"
        >
          <img src="../../logo.svg" alt="BE-commerce" className="w-14" />
          BE Commerce
        </Link>

        <div className="hidden items-center md:flex">
          <input
            type="text"
            placeholder="Search"
            className="w-96 rounded-md p-1 pl-5 font-normal text-black outline-none"
          />
          <Button className="ml-2" btnIcon={IoSearch} />
        </div>

        <div className="hidden gap-5 lg:flex">
          <ul className="flex gap-8">
            <li>
              <NavItem to="/cart" icon={IoCartOutline} label="Cart" />
              <span className="absolute top-2 ml-4 rounded-full bg-red-500 px-2 text-white">
                {totalQuantity}
              </span>
            </li>
            <li>
              <NavItem
                to="#"
                icon={HiOutlineUserCircle}
                label="Profile"
                onClick={toggleProfile}
              />
            </li>
          </ul>
          <Button>Login</Button>
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className={`transform text-2xl transition-transform duration-300 ease-in-out ${
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
        } mt-4 rounded-md bg-primary p-4 transition-all duration-500`}
      >
        <div className="flex flex-col items-center justify-center gap-4">
          <div className="flex items-center gap-2 md:hidden">
            <input
              type="text"
              placeholder="Search"
              className="rounded-md p-1 font-medium text-black"
            />
            <Button className="ml-2" btnIcon={IoSearch} />
          </div>

          <ul className="flex flex-col gap-4">
            <li>
              <NavItem to="/cart" icon={IoCartOutline} label="Cart" />
              <span className="absolute top-[132px] ml-4 rounded-full bg-red-500 px-2 text-white md:top-[85px]">
                {totalQuantity}
              </span>
            </li>
            <li>
              <NavItem
                to="#"
                icon={HiOutlineUserCircle}
                label="Profile"
                onClick={toggleProfile}
              />
            </li>
          </ul>
          <Button className="w-72">Login</Button>
        </div>
      </div>
      {isProfileOpen && <Profile onClose={toggleProfile} />}
    </nav>
  );
};

export default Header;
