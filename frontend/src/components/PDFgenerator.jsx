import React, { useState } from "react";
import Navbar from "./Navbar";

const PDFgenerator = () => {
  const [data, setData] = useState("https://www.linkedin.com/in/debasis-khamari-/");
  const [URL, setURL] = useState(""); 

  const handleSubmit = async (e) => {
    const response=await fetch("http://localhost:5000/api/v1/generate-pdf",{
      method:"POST",
      body:JSON.stringify({data:data}),
      headers:{"Content-Type":"application/json"},
      credentials:"include"
    })
    if(response.ok){
      const blob=await response.blob();
      const url=window.URL.createObjectURL(blob)
      const link=document.createElement('a')
      link.href=url
      link.setAttribute("download","output.pdf")
      link.click()
    }else{
      console.log("Failed")
    }  
  };

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
            Convert your data/URL to QR Code
          </h2>
          <span className="text-xl">
            Comprehensive way to utilize your data
          </span>
        </div>
        <div className="card-wrapper w-[700px] h-[400px] border border-[#202637d9] text-slate-300 bg-[#0C162D] rounded-sm shadow-md ">
          <div className="flex p-12 flex-col justify-center card-content">
            <div className="h-full ">
              <textarea
                value={data}
                placeholder="Enter your data here"
                onChange={(e) => setData(e.target.value)}
                className="w-full max-h-full min-h-20 bg-[#0C162D] rounded-md p-2 mb-4 focus:outline-none border-2 border-[#202637d9]"
              ></textarea>
            </div>
            <button
              onClick={handleSubmit}
              className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700"
            >
              Download PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PDFgenerator;
