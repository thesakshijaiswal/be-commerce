import {
  FaGithub,
  FaLinkedinIn,
  FaSquareFacebook,
  FaXTwitter,
} from "react-icons/fa6";
const Footer = () => {
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  return (
    <footer className="h-64 bg-third flex items-center flex-col overflow-hidden">
      <div className="w-full text-center font-ubuntu flex-grow flex p-5 gap-20">
        <div className="text-4xl font-playwrite flex flex-col items-center">
          <img
            src="../../logo.svg"
            alt="BE Commerce Logo"
            className="w-32 mb-10"
          />
          BE Commerce
        </div>
        <div className="w-9/12 flex flex-col items-center">
          <div className="flex w-full h-48 pt-2">
            <div className="flex-1  text-lg">
              <h2>Products</h2>
              <p className="text-xs pt-1">
                Explore our wide range of products designed to meet your needs.
              </p>
            </div>
            <div className="flex-1 text-lg ">
              <h2>Contact Us</h2>
              <p className="text-xs pt-1">We&apos;re here to help you!</p>
            </div>
            <div className="flex-1 text-lg flex items-center flex-col">
              <h2>Socials</h2>
              <p className="text-xs pt-1">
                Stay connected with us on social media!
              </p>

              <div className="flex text-4xl w-full gap-10 items-center justify-center pl-2 pt-7 ">
                <FaSquareFacebook className="transform transition-transform duration-300 ease-in-out hover:rotate-12 cursor-pointer" />
                <FaXTwitter className="transform transition-transform duration-300 ease-in-out hover:rotate-12 cursor-pointer" />
                <FaLinkedinIn className="transform transition-transform duration-300 ease-in-out hover:rotate-12 cursor-pointer" />
                <FaGithub className="transform transition-transform duration-300 ease-in-out hover:rotate-12 cursor-pointer" />
              </div>
              <hr className="border-t border-gray-700 mt-4 w-10/12" />
              <div className="text-sm  flex mt-2 italic gap-2 items-center justify-center">
                <a
                  href="https://www.linkedin.com/in/thesakshijaiswal"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-first transition-colors duration-300"
                >
                  @theSakshiJaiswal
                </a>

                <a
                  href="https://www.linkedin.com/in/thekiranmahajan"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:text-first transition-colors duration-300"
                >
                  @theKiranMahajan
                </a>
              </div>
            </div>
          </div>
          <div className="text-sm  group cursor-not-allowed w-72 transition-all duration-500 text-center">
            <span className="group-hover:hidden">
              &copy; {currentYear} BE Commerce. All Rights Reserved.
            </span>
            <span className="hidden group-hover:block">Made with ❤️</span>
          </div>
        </div>
      </div>
      <div className="w-full h-[5px] bg-first"></div>
    </footer>
  );
};

export default Footer;
