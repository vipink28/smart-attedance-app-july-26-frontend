import React from "react";

const FormInput = ({ label, type, name, ...props }) => {
  return (
    <div className="flex flex-col gap-2.5 mb-3">
      <label>{label}</label>
      <input
        type={type ? type : "text"}
        name={name}
        className="w-full h-10 outline-none border border-mauve-400 rounded-md p-3"
        {...props}
      />
    </div>
  );
};

export default FormInput;
