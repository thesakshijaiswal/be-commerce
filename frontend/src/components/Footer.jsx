const Footer = () => {
  const currentYear = new Date().getFullYear();
  console.log(currentYear);
  return (
    <footer className="h-64 bg-slate-900 flex items-center ">
      {" "}
      <div className="w-full text-center">&copy; BE Commerce {currentYear}</div>
    </footer>
  );
};

export default Footer;
