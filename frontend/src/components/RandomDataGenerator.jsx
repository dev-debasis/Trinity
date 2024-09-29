import React, { useEffect, useState } from "react";
import Navbar from "./Navbar";

const RandomDataGenerator = () => {
  const [options, setoptions] = useState([
    "First Name",
    "Last Name",
    "Email",
    "Gender",
    "Country",
  ]);
  const [opt, setopt] = useState([
    "First Name",
    "Last Name",
    "Email",
    "Gender",
    "Country",
  ]);
  const [equalHeight, setequalHeight] = useState(0);
  const [count, setcount] = useState(0)

  const handleDownload = async() => {
    await fetch("http://localhost:5000/api/v1/generate-random-users-data/", {
      method: "POST",
      body: JSON.stringify({
        count: count,
      }),
      headers: {
        "Content-Type": "application/json",
      },
      credentials: "include",
    }).then((response) => {
      if (response.ok) {
        return response.blob();
      } else {
        console.error('Failed to download file');
        throw new Error('Failed to download file');
      }
    }).then((blob) => {
      const link = document.createElement('a');
      link.href = window.URL.createObjectURL(blob);
      link.setAttribute('download', 'data.csv');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error('Error downloading file:', error);
    });
  }

  useEffect(() => {
    setequalHeight(100 / options.length);
  });

  const deleteOpt = (e) => {
    const value = e.target.value;
    setopt(options.filter((option) => option !== value));
  };

  return (
    <div>
      <Navbar />

      <div className="h-screen w-screen flex justify-center items-center overflow-auto bg-gradient-to-r from-[#041330] via-[#040D21] to-[#081a36] font-['Nunito Sans'] no-scrollbar overflow-hidden">
        

        <div className="h-[32rem] w-full mt-24 flex flex-col justify-center items-center">
          <div className="h-[32rem] w-80 border border-[#202637d9] card-wrapper">
            <div className="w-80 h-[32rem] card-content">
              {options.map((item, index) => {
                return (
                  <div
                    key={index}
                    className="w-full bg-[#0C162D] flex"
                    style={{ height: `${equalHeight}%` }}
                  >
                    <div className="w-full flex justify-center items-center">
                      <select
                        onChange={deleteOpt}
                        id="dropdown"
                        name="options"
                        className="w-[80%] h-1/2 rounded-md bg-slate-500 pl-5"
                        value={item}
                      >
                        {options.map((items, index) => {
                          return (
                            <option key={index} value={items}>
                              {items}
                            </option>
                          );
                        })}
                      </select>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
          <div className="flex">
            <div onChange={(e)=>{setcount(e.target.value)}} className="border border-slate-00 bg-slate-500 h-12 w-28 mt-5 mr-5 rounded-md overflow-hidden">
              <input
                type="number"
                className="w-full h-full p-3 bg-transparent placeholder-black"
                placeholder="Enter Count"
              />
            </div>
            <div onClick={handleDownload} className="border border-slate-600 h-12 w-28 mt-5 flex justify-center items-center text-[#8995a7d9] rounded-md cursor-pointer">
              Download
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RandomDataGenerator;
