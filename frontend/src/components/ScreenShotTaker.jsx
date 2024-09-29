import React, { useState } from "react";
import Navbar from "./Navbar";

const ScreenShotTaker = () => {
  const [inputUrl, setinputUrl] = useState("");
  const [width, setWidth] = useState(1280);
  const [height, setHeight] = useState(1024);
  const [isFullSize, setIsFullSize] = useState(false);

  const toggleSwitch = () => {
    setIsFullSize(!isFullSize);
  };
  
  const handleSubmit = async () => {
    await fetch("http://localhost:5000/api/v1/screenshot", {
      method: "POST",
      body: JSON.stringify({
        url: inputUrl,
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
      link.setAttribute('download', 'screenshot.png');
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }).catch((error) => {
      console.error('Error downloading file:', error);
    });
  }

  const handleDownload = (fileURL) => {
    const link = document.createElement("a");
    link.href = fileURL;
    link.setAttribute("download", "file.pdf");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };
  
  return (
    <div>
      <Navbar />
      <div className="h-screen w-screen flex flex-col justify-center items-center overflow-auto bg-gradient-to-r from-[#041330] via-[#040D21] to-[#081a36] font-['Nunito Sans'] no-scrollbar">
        <div className="text-[#8995a7d9] text-center mb-10 ">
          <h2 className="font-bold text-4xl">
            Take a screenshot website online
          </h2>
          <span className="text-xl">
            An easy way to capture a screenshot of a full webpage
          </span>
        </div>
        <div className="card-wrapper w-[700px] h-[400px] border border-[#202637d9]  text-slate-300 bg-[#0C162D] rounded-sm shadow-md ">
          <div className="flex p-12 flex-col justify-center card-content">
            <input
              type="text"
              value={inputUrl}
              placeholder="i.e: https://www.linkedin.com/in/debasis-khamari-/"
              className="w-full border bg-[#0C162D] rounded-md p-2 mb-4"
              onChange={(e) => {
                setinputUrl(e.target.value);
              }}
            />

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-[#8995a7d9]">
                  Width:
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="range"
                    min="640"
                    max="3840"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    value={width}
                    onChange={(e) => setWidth(e.target.value)}
                    className="w-16 ml-2 border border-gray-300 rounded-md p-1 text-sm"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-[#8995a7d9]">
                  Height:
                </label>
                <div className="flex items-center mt-1">
                  <input
                    type="range"
                    min="480"
                    max="2160"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-full"
                  />
                  <input
                    type="number"
                    value={height}
                    onChange={(e) => setHeight(e.target.value)}
                    className="w-16 ml-2 border border-gray-300 rounded-md p-1 text-sm"
                  />
                </div>
              </div>

              <div className="flex items-center space-x-2">
                <label className="text-sm font-medium text-[#8995a7d9]">
                  Full-size:
                </label>
                <div
                  onClick={toggleSwitch}
                  className={`w-12 h-6 flex items-center rounded-full p-1 cursor-pointer ${
                    isFullSize ? "bg-blue-500" : "bg-gray-300"
                  }`}
                >
                  <div
                    className={`h-4 w-4 rounded-full bg-white transform transition-transform ${
                      isFullSize ? "translate-x-6" : ""
                    }`}
                  ></div>
                </div>
              </div>
            </div>

            <button onClick={handleSubmit} className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Download screenshot
            </button>
            </div>
        </div>
      </div>
    </div>
  );
};

export default ScreenShotTaker;
