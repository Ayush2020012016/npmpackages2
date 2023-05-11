import React, { useEffect, useState } from "react";
import Button from "../Components/Button";
import { useNavigate } from "react-router-dom";

const Homepage = () => {
  // initialize the react router's navigate function
  const navigate = useNavigate();

  // retrieve the packages list from local storage and initialize it to state
  const [packagesList, setPackagesList] = useState(
    JSON.parse(localStorage.getItem("packagesList"))
  );

  // useEffect to log the packagesList whenever it updates
  useEffect(() => {
    localStorage.setItem("packagesList", JSON.stringify(packagesList)); //store packagesList state in localStorage as a stringified JSON object
  }, [packagesList]);

  // function to navigate to the Add Package page
  const handleClick = () => {
    navigate("/add", { state: "ayush" });
  };

  // function to navigate to the View Package page
  const handleViewClick = (value) => {
    console.log(value);
    navigate("/view", { state: value });
  };

  // function to navigate to the Edit Package page
  const handleEditClick = (value) => {
    console.log(value);
    navigate("/edit", { state: value });
  };

  // function to delete a package from the packagesList
  const handleDeleteClick = (value) => {
    if (window.confirm(`Are you sure you want to delete ${value.name}?`)) {
      // filter out the package with the same name as the clicked package
      const updatedPackagesList = packagesList.filter(
        (pkg) => pkg.name !== value.name
      );
      // set the packagesList state to the updated list
      setPackagesList(updatedPackagesList);
    }
  };
  console.log("localStorage");
  return (
    <div className=" h-[100vh] md:p-[100px] p-[20px]">
      <div className="flex justify-between">
        <div className="heading text-[2em] font-bold">
          Welcome to the Favorite NPM Packages.
        </div>
        {packagesList.length > 0 ? (
          <>
            {" "}
            <div className="text-center">
              <Button onClick={handleClick} label="Add Packages" />
            </div>
          </>
        ) : null}
      </div>

      {packagesList.length > 0 ? (
        <>
          <div className="mainsection md:mt-[150px] p-9 mt-[50px] h-[40vh] border border-slate-400">
            <div className="flex text-[20px]  font-semibold">
              <div className="w-3/5 text-start">Package Name</div>
              <div>Actions</div>
            </div>
            <div className=" text-[15px]  font-medium">
              {packagesList.map((value, index) => {
                return (
                  <>
                    <div className="flex">
                      <div className="w-3/5 text-start">{value.name}</div>
                      <div className="">
                        <span
                          onClick={() => handleViewClick(value)}
                          class="material-symbols-outlined"
                        >
                          visibility
                        </span>
                        <span
                          onClick={() => handleEditClick(value)}
                          class="material-symbols-outlined"
                        >
                          edit
                        </span>
                        <span
                          onClick={() => handleDeleteClick(value)}
                          class="material-symbols-outlined"
                        >
                          delete
                        </span>
                      </div>
                    </div>
                  </>
                );
              })}
            </div>
          </div>
        </>
      ) : (
        <>
          <div className="mainsection md:mt-[150px] mt-[50px] h-[40vh] flex flex-col justify-center border border-slate-400">
            <div className="text-center mb-[30px]">
              you dont have any fav yet. Please Add.
            </div>
            <div className="text-center">
              <Button onClick={handleClick} label="Add Packages" />
            </div>
          </div>
        </>
      )}
    </div>
  );
};

export default Homepage;
