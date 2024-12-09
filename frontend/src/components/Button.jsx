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
          className={`bg-secondary flex items-center justify-center gap-2 rounded-md px-4 py-[6px] text-base text-white ${className}`}
        >
          {children}
          {Icon && <Icon className="text-xl" />}
        </button>
      )}
    </>
  );
};

export default Button;
