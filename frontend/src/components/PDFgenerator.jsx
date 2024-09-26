import React, { useState } from 'react'
import Navbar from './Navbar';
const PDFgenerator = () => {
  const [data, setdata] = useState("")

  const handleSubmit = async () => {
    const res = await fetch("http://localhost:5000/api/v1/generate-pdf", {
      method: "post",
      credentials: 'include',
      headers: {
        'Content-Type': 'application/json',
      },
    
      body: JSON.stringify({
        "data": data
      })
  });

  console.log(res)
  
  }
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
        <div className="card-wrapper w-[700px] h-[400px] border border-[#202637d9]  text-slate-300 bg-[#0C162D] rounded-sm shadow-md ">
          <div className="flex p-12 flex-col justify-center card-content">
            <div className='h-full '>
            <textarea value={data} placeholder='Enter you data here' onChange={(e) => {setdata(e.target.value)}} className='w-full max-h-full min-h-20 bg-[#0C162D] rounded-md p-2 mb-4  focus:outline-none border-2 border-[#202637d9]'>
            </textarea>
            </div>
            
            <button onClick={handleSubmit} className="mt-6 w-full bg-blue-600 text-white p-3 rounded-md hover:bg-blue-700">
              Generate PDF
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}


export default PDFgenerator
