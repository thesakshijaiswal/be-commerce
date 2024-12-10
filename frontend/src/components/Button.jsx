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
          className={`flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-[6px] text-base text-white shadow-md ${className}`}
        >
          {children}
          {Icon && <Icon className="text-xl" />}
        </button>
      )}
    </>
  );
};

export default Button;
