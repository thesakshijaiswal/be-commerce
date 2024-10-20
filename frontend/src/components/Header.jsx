import { TiShoppingCart } from "react-icons/ti";
import { LuUserCircle2 } from "react-icons/lu";
import { IoSearch } from "react-icons/io5";
const Header = () => {
  return (
    <nav className="bg-[#FFB703] p-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="../../logo.svg" alt="BE-commerce" className="w-20" />
            <a href="/" className="text-2xl font-bold font-playwrite">
              BE commerce
            </a>
          </div>
          <div className="flex items-center">
            <input
              type="text"
              placeholder="Search"
              className="p-2 w-96 rounded-lg"
            />
            <button className="text-white bg-black px-4 py-2 rounded-lg ml-2 font-ubuntu text-xl">
            <IoSearch />
            </button>
          </div>
          <div>
            <ul className="flex gap-5 font-semibold font-ubuntu">
              <li className="flex items-center"><TiShoppingCart className="w-6 h-6"/>Cart</li>
              <li className="flex items-center"><LuUserCircle2 className="w-5 h-5" />Profile</li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
