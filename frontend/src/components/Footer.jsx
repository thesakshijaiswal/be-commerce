import {
  FaGithub,
  FaLinkedinIn,
  FaSquareFacebook,
  FaXTwitter,
} from "react-icons/fa6";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  return (
    <footer className="flex min-h-64 flex-col items-center overflow-hidden bg-third">
      <div className="flex w-full flex-grow flex-col p-2 text-center font-ubuntu md:flex-row md:gap-5 lg:gap-10 lg:p-5">
        <div className="flex flex-col items-center border-b border-gray-700 pb-10 font-playwrite text-2xl sm:text-3xl md:text-4xl">
          <img
            src="../../logo.svg"
            alt="BE Commerce Logo"
            className="mb-5 w-28 pt-5 sm:w-32 lg:mb-10"
          />
          BE Commerce.
        </div>
        <div className="flex w-full flex-col items-center lg:w-9/12">
          <div className="flex h-full w-full flex-col md:h-48 md:flex-row">
            <div className="flex w-full flex-col items-center border-b border-gray-700 py-5 text-lg sm:text-xl md:flex-1 md:border-none">
              <h2>Products</h2>
              <p className="pt-1 text-xs text-gray-300 sm:text-sm">
                Explore our wide range of products
              </p>
              <ul className="mt-4 cursor-default space-y-2 text-center text-sm text-gray-100 sm:text-base">
                <li className="transition-transform duration-300 hover:translate-x-2">
                  Electronics
                </li>
                <li className="transition-transform duration-300 hover:translate-x-2">
                  Home & Kitchen
                </li>
                <li className="transition-transform duration-300 hover:translate-x-2">
                  Health & Personal Care
                </li>
              </ul>
            </div>
            <div className="border-b border-gray-700 py-5 text-lg sm:text-xl md:w-56 md:flex-1 md:border-none lg:w-full">
              <h2>Contact Us</h2>

              <p className="pt-1 text-xs text-gray-300 sm:text-sm">
                We&apos;re here to help you!
              </p>
              <ul className="mt-4 cursor-default space-y-2 text-center text-sm text-gray-100 sm:text-base">
                <li className="transition-transform duration-300 hover:translate-x-2">
                  Email: support@becommerce.com
                </li>
                <li className="transition-transform duration-300 hover:translate-x-2">
                  Phone: +91 92834 92384
                </li>
                <li className="transition-transform duration-300 hover:translate-x-2">
                  Address: Maharashtra, India.
                </li>
              </ul>
            </div>
            <div className="flex flex-1 flex-col items-center border-b border-gray-700 py-5 text-lg sm:text-xl md:border-none">
              <h2>Socials</h2>
              <p className="pt-1 text-xs text-gray-300 sm:text-sm">
                Stay connected with us on social media!
              </p>

              <div className="flex items-center justify-center gap-10 border-b border-gray-700 py-2 pt-5 text-4xl md:w-full md:gap-2 lg:gap-10">
                <FaSquareFacebook className="transform cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-12 hover:text-first" />
                <FaXTwitter className="transform cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-12 hover:text-first" />
                <FaLinkedinIn className="transform cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-12 hover:text-first" />
                <FaGithub className="transform cursor-pointer transition-transform duration-300 ease-in-out hover:rotate-12 hover:text-first" />
              </div>
              <div className="mt-1 flex items-center justify-center gap-2 font-playwrite text-xs italic">
                <a
                  href="https://www.linkedin.com/in/thesakshijaiswal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:translate-y-1 hover:text-first"
                >
                  @theSakshiJaiswal
                </a>

                <a
                  href="https://www.linkedin.com/in/thekiranmahajan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-all duration-300 hover:translate-y-1 hover:text-first"
                >
                  @theKiranMahajan
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="group relative w-full cursor-not-allowed py-5 text-center text-sm">
        <span className="absolute inset-0 top-3 opacity-100 transition-opacity duration-500 ease-in-out group-hover:opacity-0">
          &copy; {currentYear} BE Commerce. All Rights Reserved.
        </span>
        <span className="absolute inset-0 top-3 opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100">
          Made with ❤️
        </span>
      </div>
      <div className="h-[5px] w-full bg-first"></div>
    </footer>
  );
};

export default Footer;
