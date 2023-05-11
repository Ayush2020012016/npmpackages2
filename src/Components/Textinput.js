import React from "react";

const Textinput = ({ value, onChange, placeholder, onKeyDown }) => {
  return (
    <div>
      <input
        className="w-full  border-2 border-slate-400 p-3"
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        onKeyDown={onKeyDown}
      />
    </div>
  );
};

export default Textinput;
