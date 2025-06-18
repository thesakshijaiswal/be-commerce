import { HiOutlineUserCircle } from "react-icons/hi2";
import { IoCartOutline, IoSearch } from "react-icons/io5";
import { useState, useEffect } from "react";
import { FaX } from "react-icons/fa6";
import { BsThreeDotsVertical } from "react-icons/bs";
import Button from "./Button";
import Profile from "./Profile";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Branding from "./Branding";

const Header = () => {
  const { keyword: urlKeyword } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [keyword, setKeyword] = useState(urlKeyword || "");
  const { cartItems } = useSelector((state) => state.cart);
  const { userInfo } = useSelector((state) => state.user);
  const navigate = useNavigate();

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
      onClick={() => {
        setIsMenuOpen(false);
        if (onClick) onClick();
      }}
    >
      {Icon && <Icon className="mr-2 h-8 w-8" />}
      {label}
    </Link>
  );

  const totalQuantity = cartItems.reduce((sum, item) => sum + item.quantity, 0);

  const renderProfile = () => {
    return (
      <NavItem
        to="#"
        icon={() =>
          userInfo?.picture ? (
            <img
              src={userInfo.picture}
              alt={`${userInfo.name}'s profile`}
              className="mr-2 h-8 w-8 rounded-full object-cover"
            />
          ) : (
            <HiOutlineUserCircle className="h-8 w-8" aria-hidden="true" />
          )
        }
        label={userInfo?.name}
        onClick={toggleProfile}
      />
    );
  };

  const renderLoginButton = () => {
    return (
      <Button
        className="w-64 lg:w-full"
        onClick={() => {
          navigate("/login");
        }}
        ariaLabel="Login"
      >
        Login
      </Button>
    );
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (keyword) {
      navigate(`/search/${keyword.trim()}`);
      setKeyword("");
    }
  };

  return (
    <nav
      className="relative z-50 bg-primary p-2"
      role="navigation"
      aria-label="Main Navigation"
    >
      <div className="flex items-center justify-between">
        <Link
          to="/"
          className="flex items-center font-playwrite text-xl font-bold"
          aria-label="Home"
        >
          <Branding />
        </Link>

        <form
          onSubmit={handleSearch}
          className="hidden items-center md:flex"
          role="search"
        >
          <input
            name="Search"
            type="text"
            aria-label="Search"
            placeholder="Search products, brands or categories..."
            className="w-96 rounded-md p-1.5 pl-5 text-sm text-black outline-none"
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
          />
          <Button
            ariaLabel="Search"
            type="submit"
            className="ml-2"
            btnIcon={IoSearch}
          />
        </form>

        <div className="hidden gap-5 lg:flex">
          <ul className="flex items-center gap-8">
            <li className="relative">
              <NavItem to="/cart" icon={IoCartOutline} label="Cart" />
              <span className="absolute -top-2 ml-4 rounded-full bg-red-500 px-2 text-white">
                {totalQuantity}
              </span>
            </li>
            {userInfo && <li>{renderProfile()}</li>}
            {userInfo?.isAdmin && (
              <Button ariaLabel="Dashboard">
                <NavItem to="/admin" label="Dashboard" />
              </Button>
            )}
          </ul>
          {!userInfo && renderLoginButton()}
        </div>

        <div className="lg:hidden">
          <button
            onClick={toggleMenu}
            className={`transform text-2xl transition-transform duration-300 ease-in-out ${
              isMenuOpen ? "rotate-180" : ""
            }`}
            aria-label={isMenuOpen ? "Close menu" : "Open menu"}
            aria-expanded={isMenuOpen}
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
          <form
            onSubmit={handleSearch}
            className="flex items-center gap-2 md:hidden"
            role="search"
          >
            <input
              name="search"
              type="text"
              aria-label="Search"
              placeholder="Search for products..."
              className="rounded-md p-1.5 text-sm text-black"
              value={keyword}
              onChange={(e) => setKeyword(e.target.value)}
            />
            <Button ariaLabel="Search" type="submit" btnIcon={IoSearch} />
          </form>

          <ul className="flex flex-col items-center justify-center gap-4">
            <li className="relative">
              <NavItem to="/cart" icon={IoCartOutline} label="Cart" />
              <span className="absolute -top-2 ml-4 rounded-full bg-red-500 px-2 text-white">
                {totalQuantity}
              </span>
            </li>
            {userInfo && <li>{renderProfile()}</li>}
            {userInfo?.isAdmin && (
              <Button>
                <NavItem to="/admin" label="Dashboard" />
              </Button>
            )}
          </ul>
          {!userInfo && renderLoginButton()}
        </div>
      </div>
      {isProfileOpen && <Profile onClose={toggleProfile} />}
    </nav>
  );
};

export default Header;
