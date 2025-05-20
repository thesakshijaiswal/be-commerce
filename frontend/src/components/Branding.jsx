const Branding = ({ className }) => {
  return (
    <div className={`flex items-center justify-center gap-2 ${className}`}>
      <img src="/logo.svg" alt="logo" className="w-12" />
      <h3 className="font-playwrite">BE-Commerce</h3>
    </div>
  );
};

export default Branding;
