import { TiShoppingCart } from "react-icons/ti";
import { LuUserCircle2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
import { useState } from "react";
import { FaBars } from "react-icons/fa";
import Button from "./Button";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <nav className="bg-[#FFB703] p-2">
      <div>
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="../../logo.svg" alt="BE-commerce" className="w-14" />
            <a href="/" className="text-xl font-bold font-playwrite">
              BE Commerce
            </a>
          </div>

          <div className="hidden md:flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="p-1 pl-5 w-96 rounded-md text-black font-normal outline-none"
            />
            <Button btnIcon={<IoSearch className="text-lg" />}></Button>
          </div>

          <div className="hidden lg:flex gap-5">
            <ul className="flex gap-8">
              <li className="flex items-center">
                <TiShoppingCart className="w-9 h-9 mr-2" />
                Cart
              </li>
              <li className="flex items-center">
                <LuUserCircle2 className="w-7 h-7 mr-2" />
                Profile
              </li>
            </ul>
            <Button btnText={"Login"}></Button>
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
          } lg:hidden mt-4 bg-[#FFB703] p-4 rounded-md`}
        >
          <div className="flex flex-col gap-4">
            <div className="md:hidden flex items-center gap-2">
              <input
                type="text"
                placeholder="Search"
                className="p-1 rounded-md text-black font-medium"
              />
              <Button btnIcon={<IoSearch className="text-lg" />}></Button>
            </div>

            <ul className="flex flex-col gap-4">
              <li className="flex items-center">
                <TiShoppingCart className="w-9 h-9 mr-2" />
                Cart
              </li>
              <li className="flex items-center">
                <LuUserCircle2 className="w-7 h-7 ml-1 mr-3" />
                Profile
              </li>
            </ul>
            <Button btnText={"Login"} className="w-80"></Button>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
