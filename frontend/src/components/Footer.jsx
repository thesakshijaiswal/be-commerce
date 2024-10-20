const Footer = () => {
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  return (
    <footer className="h-64 bg-[#232325] flex items-center ">
      {" "}
      <div className="w-full text-center font-ubuntu">
        &copy; BE Commerce {currentYear}
      </div>
    </footer>
  );
};

export default Footer;
