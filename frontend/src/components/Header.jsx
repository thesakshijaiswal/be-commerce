const Header = () => {
  return (
    <nav className="bg-[#FFB703] p-4">
      <div className="">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <img src="../../logo.svg" alt="BE-commerce" className="w-20" />
            <a href="/" className="text-2xl font-bold">
              BE-commerce
            </a>
          </div>
          <div>
            <input
              type="text"
              placeholder="Search"
              className="p-2 w-96 rounded-lg"
            />
            <button className="text-white bg-black px-4 py-2 rounded-lg ml-2">
              Search
            </button>
          </div>
          <div>
            <ul className="flex gap-5 font-semibold">
              <li>Cart</li>
              <li>Profile</li>
              <li>Login</li>
            </ul>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Header;
