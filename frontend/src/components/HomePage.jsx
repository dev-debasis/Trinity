import React, { useEffect } from 'react'
import { useNavigate } from 'react-router-dom';
import { Banner } from './Banner'
import bgImg from '../assets/images/banner-bg.png'

const HomePage = () => {

  let navigate = useNavigate(); 
  const screenShot = () =>{ 
    let path = `/screenshot`; 
    navigate(path);
  }
  const GenData = () =>{ 
    let path = `/generate-random-users-data`; 
    navigate(path);
  }
  
  const PDFQR = () =>{ 
    let path = `/generate-pdf`; 
    navigate(path);
  }

 
  

  return (
    <div className=''>
      <div className='relative border bg-[#0C162D] border-[#202637d9] w-full h-[360px] mt-20 overflow-hidden rounded-xl'>
        <img src={bgImg} alt="" className='absolute -z-1'/>
        <Banner/>
      </div>

      <div className='flex flex-col md:flex-row md:gap-y-0 gap-y-5 gap-x-0 justify-between items-center mt-4'>
        <div className='w-[80%] md:w-[30%] sm:w-100% h-[10rem] bg-[#0C162D] border border-[#202637d9] card-wrapper'>
          <div onClick={screenShot} className='card-content'></div>
        </div>
        <div className='w-[80%] md:w-[30%] h-[10rem] bg-[#0C162D] border border-[#202637d9] card-wrapper'>
          <div onClick={GenData} className='card-content'></div>
        </div>
        <div className='w-[80%] md:w-[30%] h-[10rem] bg-[#0C162D] border border-[#202637d9] card-wrapper'>
          <div onClick={PDFQR} className='card-content'></div>
        </div>

      </div>
    </div>
  )
}

export default HomePage
