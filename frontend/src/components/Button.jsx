import React from "react";

const Button = ({
  onClick = () => {},
  btnIcon: Icon = null,
  btnText = "",
  className = "",
}) => {
  return (
    <button
      onClick={onClick}
      className={`ml-2 rounded-md bg-black px-4 py-[6px] text-base text-white ${className}`}
    >
      {btnText}
      {Icon && <Icon className= ""/>}
    </button>
  );
};

export default Button;
