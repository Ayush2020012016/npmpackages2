import React from "react";

const Textarea = ({
  height = "200px",
  padding = 3,
  borderColor = "slate-400",
  value,
  onChange,
}) => {
  return (
    <div>
      <textarea
        className={` w-full   h-[${height}]  border-2 border-${borderColor} p-${padding}`}
        value={value}
        onChange={onChange}
      />
    </div>
  );
};

export default Textarea;
