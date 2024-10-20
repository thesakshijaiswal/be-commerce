import React from "react";

const Button = ({ onClick = () => {}, btnIcon = "", btnText, className=""}) => {
  return (
    <button onClick={onClick} className={`text-white bg-black px-4 py-[6px] rounded-md ml-2 text-base ${className}`}>
      {btnText}
      {btnIcon}
    </button>
  );
};

export default Button;
