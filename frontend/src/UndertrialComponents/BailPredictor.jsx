import React, { useState } from "react";
import axios from "axios";

const BailPredictor = () => {
  const [searchText, setSearchText] = useState("");
  const [results, setResults] = useState(null);
  const [bailable, setIsBailable] = useState(true);
  const checkEligibility = async () => {
    try {
      console.log(searchText);
      const offenses = searchText.trim().split(/\s+/).join(",");
      const response = await fetch(`http://127.0.0.1:5000/get_info`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ offenses }),
      });

      if (!response.ok) {
        console.error(`HTTP error! Status: ${response.status}`);
        return;
      }

      const data = await response.json();
      console.log(data.data[0]);
      setResults(data.data);
      if (data?.data) {
        const isAnyNonBailable = data.data.some(
          (result) => result.Bail_Eligibility_Status === "Non-bailable"
        );
        setIsBailable(!isAnyNonBailable);
      }
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };
  return (
    <div>
      <div className="relative text-gray-600 flex justify-center flex-col items-center">
        <div className="flex justify-center items-center">
          <h1 className="font-bold mb-4 text-center">
            Want to find out if you are eligible for bail? <br />
            Enter all your crimes and find out!
          </h1>
        </div>
        <input
          value={searchText}
          onChange={(e) => {
            setSearchText(e.target.value);
          }}
          type="search"
          name="search"
          placeholder="Example: Murder Theft Rape"
          className="bg-gray-300 h-10 w-2/3 px-5 pr-10 rounded-full text-sm focus:outline-none text-black"
        />
        <button
          onClick={checkEligibility}
          className="rounded-full text-black hover:bg-gray-600 bg-slate-500 p-1 absolute bottom-1 right-52"
        >
          Submit
        </button>
      </div>
      {results && (
        <div className="flex flex-col justify-center items-center mt-5">
          <h1>Results:</h1>
          <pre>
            {bailable
              ? "You are eligible for bail!"
              : "You are currently not eligible for bail"}
          </pre>
        </div>
      )}
    </div>
  );
};

export default BailPredictor;
