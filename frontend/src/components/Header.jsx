import { TiShoppingCart } from "react-icons/ti";
import { LuUserCircle2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { FaBars } from "react-icons/fa";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#FFB703] p-4">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="../../logo.svg" alt="BE-commerce" className="w-20" />
            <a href="/" className="text-2xl font-bold font-playwrite">
              BE commerce
            </a>
          </div>

          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="p-2 w-96 rounded-lg text-black font-medium"
            />
            <button className="text-white bg-black px-4 py-2 rounded-lg ml-2 text-xl">
              <IoSearch />
            </button>
          </div>

          <div className="hidden lg:flex gap-5">
            <ul className="flex gap-5">
              <li className="flex items-center">
                <TiShoppingCart className="w-6 h-6" />
                Cart
              </li>
              <li className="flex items-center">
                <LuUserCircle2 className="w-5 h-5" />
                Profile
              </li>
            </ul>
            <button className="bg-black px-4 py-2 rounded-lg">Login</button>
          </div>

          <div className="lg:hidden">
            <button onClick={toggleMenu}>
              <FaBars className="w-6 h-6" />
            </button>
          </div>
        </div>

        <div
          className={`${
            isMenuOpen ? "block" : "hidden"
          } lg:hidden mt-4 bg-[#FFB703] p-4 rounded-lg`}
        >
          <div className="flex flex-col gap-4">
            <div className="md:hidden flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="p-2 rounded-lg text-black font-medium"
              />
              <button className="text-white bg-black px-4 py-2 rounded-lg text-xl">
                <IoSearch />
              </button>
            </div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center">
                <TiShoppingCart className="w-6 h-6" />
                Cart
              </li>
              <li className="flex items-center">
                <LuUserCircle2 className="w-5 h-5" />
                Profile
              </li>
            </ul>
            <button className="bg-black px-4 py-2 rounded-lg">Login</button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
