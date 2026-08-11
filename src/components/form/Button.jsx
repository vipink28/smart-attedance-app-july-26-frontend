import React from "react";

const Button = ({ primary, children, ...props }) => {
  return (
    <button
      {...props}
      className={`px-5 py-3 font-semibold cursor-pointer rounded-lg ${primary ? "bg-mauve-900" : "bg-mauve-400 text-mauve-950"}`}
    >
      {children}
    </button>
  );
};

export default Button;
