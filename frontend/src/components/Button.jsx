const Button = ({
  onClick = () => {},
  btnIcon: Icon = null,
  children = "",
  className = "",
}) => {
  return (
    <>
      {(children || Icon) && (
        <button
          onClick={onClick}
          className={`flex items-center justify-center gap-2 rounded-md bg-black px-4 py-[6px] text-base text-white ${className}`}
        >
          {children}
          {Icon && <Icon className="text-xl" />}
        </button>
      )}
    </>
  );
};

export default Button;
