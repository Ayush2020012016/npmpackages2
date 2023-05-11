import React, { useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Edit = () => {
  const navigate = useNavigate();
  const { state } = useLocation();
  const [description, setDescription] = useState("");
  console.log(state.name);
  const handleClick = () => {
    navigate("/");
  };
  const handleChange = (e) => {
    setDescription(e.target.value);
  };
  const handleSubmit = () => {
    // Get the packagesList from localStorage
    const packagesList = JSON.parse(localStorage.getItem("packagesList"));

    // Find the index of the package to update
    const packageIndex = packagesList.findIndex(
      (pkg) => pkg.name === state.name
    );
    console.log(description);
    // Update the description of the package with the new value entered by the user
    packagesList[packageIndex].description = description;

    // Update the packagesList in localStorage
    localStorage.setItem("packagesList", JSON.stringify(packagesList));

    // Navigate back to the homepage
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
        <div className="text-3xl mt-4 font-bold">Update the Description</div>
        <textarea
          value={description}
          onChange={handleChange}
          type="text"
          className="px-4 py-2 rounded-lg w-full mt-3 mb-4 h-[9em]"
        />
        <button
          className="font-medium  px-4 py-2 hover:opacity-80 text-3xl text-center w-full bg-blue-400 rounded"
          onClick={handleSubmit}
        >
          Submit
        </button>
        <button
          className="font-medium mt-3 px-4 py-2 hover:opacity-80 text-3xl text-center w-full bg-blue-400 rounded"
          onClick={handleClick}
        >
          Return
        </button>
      </div>
    </div>
  );
};

export default Edit;
