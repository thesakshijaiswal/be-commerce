const Button = ({
  onClick = () => {},
  btnIcon: Icon = null,
  children = "",
  className = "",
  ariaLabel,
  type = "button",
}) => {
  const accessibleName = children || ariaLabel;

  if (!accessibleName) {
    console.warn(
      "Accessible button rendered without label: please provide either children or ariaLabel",
    );
  }

  return (
    <button
      type={type}
      onClick={onClick}
      className={`flex items-center justify-center gap-2 rounded-md bg-secondary px-4 py-[6px] text-base text-white shadow-md ${className}`}
      aria-label={!children ? ariaLabel : undefined}
    >
      {children}
      {Icon && (
        <Icon className="text-xl" aria-hidden="true" focusable="false" />
      )}
    </button>
  );
};

export default Button;
