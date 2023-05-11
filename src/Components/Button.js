import React from "react";

const Button = ({
  onClick,
  label = "add text",
  bgcolor = "bg-blue-700",
  block = false,
}) => {
  return (
    <button
      onClick={onClick}
      className={`text-white  ${bgcolor} ${
        block ? "block" : ""
      } px-4 py-2 rounded-md hover:opacity-80`}
    >
      {label}
    </button>
  );
};

export default Button;
