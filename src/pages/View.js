import React from "react";
import { useLocation, useNavigate } from "react-router-dom";

const View = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  console.log(state.name);
  const handleClick = () => {
    navigate("/");
  };
  return (
    <div className="w-full h-[100vh] flex justify-center items-center ">
      <div className="w-[500px] h-[500px] bg-slate-400 rounded-lg p-5 relative">
        <div className="text-2xl">
          <span className="font-bold text-3xl">Name:</span> {state.name}
        </div>
        <div className="text-2xl mt-4">
          <span className="font-bold text-3xl">description:</span>{" "}
          {state.description}
        </div>
        <button
          className="font-medium absolute bottom-4 px-4 py-2 hover:opacity-80 text-3xl text-center w-[94%] bg-blue-400 rounded"
          onClick={handleClick}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default View;
