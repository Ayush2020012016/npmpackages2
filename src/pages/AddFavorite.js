import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Textinput from "../Components/Textinput";
import Textarea from "../Components/Textarea";
import Button from "../Components/Button";

const AddFavorite = () => {
  const navigate = useNavigate(); //useNavigate hook from react-router-dom to programmatically navigate to other pages
  const [packagesList, setPackagesList] = useState(
    JSON.parse(localStorage.getItem("packagesList")) //get packagesList from localStorage or null if it doesn't exist and parse it as JSON
  );
  const [packList, setPackList] = useState([]); //initialize packList state as an empty array
  const [searchQuery, setSearchQuery] = useState("node"); //initialize searchQuery state with "node" as default
  const [searchinput, setSearchinput] = useState("node"); //initialize searchinput state with "node" as default
  const [textinput, setTextinput] = useState(""); //initialize textinput state as an empty string
  const [isLoading, setIsLoading] = useState(true); //initialize isLoading state as true
  const [selectedPackage, setSelectedPackage] = useState([]); //initialize selectedPackage state as an empty array

  useEffect(() => {
    try {
      const getData = async () => {
        const response = await fetch(
          `https://registry.npmjs.org/-/v1/search?text=${searchQuery}&size=10`
        ); //fetch API data based on searchQuery state
        const packages = await response.json();
        setPackList(packages.objects); //update packList state with packages.objects from API response
        setIsLoading(false); //set isLoading state to false
      };
      if (searchQuery) {
        setTimeout(getData, 500);
      }
    } catch (error) {
      console.log(error);
    }
  }, [searchQuery]);

  useEffect(() => {
    localStorage.setItem("packagesList", JSON.stringify(packagesList)); //store packagesList state in localStorage as a stringified JSON object
    if (selectedPackage.length !== 0) {
      navigate("/");
    }
  }, [packagesList]);

  const handleChange = (e) => {
    setSearchinput(e.target.value); //update searchinput state with input value as user types
  };
  const handleClick = (e) => {
    if (e.key === "Enter") {
      setIsLoading(true); //set isLoading state to true while API data is being fetched
      setSearchQuery(searchinput); //update searchQuery state with user input when they hit the Enter key
    }
  };
  const handleRadioChange = (e) => {
    setSelectedPackage(e.target.value); //update selectedPackage state with the value of the radio button that was clicked
  };
  const handlebtnClick = () => {
    if (selectedPackage && textinput) {
      const uniquePackages = [
        ...packagesList,
        { name: selectedPackage, description: textinput },
      ].filter(
        (obj, index, self) =>
          index === self.findIndex((o) => o.name === obj.name)
      );
      setPackagesList(uniquePackages);
    } else {
      alert("please select a package and enter the reason for selecting it ");
    }
  };

  return (
    <div className="h-[100vh] md:p-[100px] p-[20px]">
      <div className="heading text-[2em] font-bold">Search NPM Packages.</div>
      <div>
        <Textinput
          value={searchinput}
          onChange={handleChange}
          placeholder={"angular"}
          onKeyDown={handleClick}
        />
      </div>

      {isLoading ? (
        <>loading...</>
      ) : (
        <>
          <div className="mt-4">
            {packList.map((value, index) => {
              return (
                <div key={`${value.package.name}${index}`}>
                  <div className="text-[20px]">
                    <span>
                      <input
                        className="mr-3"
                        type="radio"
                        name="package"
                        value={value.package.name}
                        onChange={handleRadioChange}
                        checked={selectedPackage === value.package.name}
                      />
                    </span>
                    {value.package.name}
                  </div>
                </div>
              );
            })}
          </div>
        </>
      )}

      <div className="mt-5">
        <div className="heading text-[1.5em] font-bold">
          Why is this you fav?
        </div>
        <Textarea
          value={textinput}
          onChange={(e) => {
            setTextinput(e.target.value);
          }}
        />
        <div className="text-right">
          <Button onClick={handlebtnClick} label="Submit" />
        </div>
      </div>
    </div>
  );
};

export default AddFavorite;
