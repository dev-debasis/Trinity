import React, {useEffect} from 'react';
import { useNavigate } from 'react-router-dom';
import { Banner } from './Banner';
import bgImg from '../assets/images/banner-bg.png';
import first from "../assets/images/1st.jpg";
import second from "../assets/images/3.jpg";
import third from "../assets/images/4.jpg";


const HomePage = () => {
  const navigate = useNavigate();

  const screenShot = () => navigate(`/screenshot`);
  const GenData = () => navigate(`/generate-random-users-data`);
  const PDFQR = () => navigate(`/generate-pdf`);

  return (
    <div className='px-4 py-6 md:px-10 lg:px-20'>
      {/* Banner Section */}
      <div className='relative bg-[#0C162D] border border-[#202637d9] w-full h-[280px] md:h-[360px] mt- 0 overflow-hidden rounded-xl'>
        <img src={bgImg} alt="background" className='absolute inset-0 w-full h-full object-cover -z-10' />
        <Banner />
      </div>

      {/* Card Section */}
      <div className='flex flex-col md:flex-row gap-y-5 md:gap-y-0 gap-x-5 justify-between items-center mt-4'>
        <div className='w-full md:w-[30%] h-[10rem] bg-[#0C162D] border border-[#202637d9] rounded-lg relative cursor-pointer card-wrapper'>
          <div onClick={screenShot} className='w-full h-full card-content'>
            <img src={first} alt="Web Snapshot" className='absolute inset-0 w-full h-full object-cover opacity-80' />
            <div className='absolute inset-0 flex flex-col justify-center items-start pl-4 text-white'>
              <div className='font-bold text-lg md:text-xl lg:text-2xl'>WEB</div>
              <div className='font-bold text-lg md:text-xl lg:text-2xl'>SNAPSHOT</div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-[30%] h-[10rem] bg-[#0C162D] border border-[#202637d9] rounded-lg relative cursor-pointer card-wrapper'>
          <div onClick={GenData} className='w-full h-full card-content'>
            <img src={second} alt="User Data Generation" className='absolute inset-0 w-full h-full object-cover opacity-80' />
            <div className='absolute inset-0 flex flex-col justify-center items-start pl-4 text-white'>
              <div className='font-bold text-lg md:text-xl lg:text-2xl'>USER</div>
              <div className='font-bold text-lg md:text-xl lg:text-2xl'>DATA GENERATION</div>
            </div>
          </div>
        </div>

        <div className='w-full md:w-[30%] h-[10rem] bg-[#0C162D] border border-[#202637d9] rounded-lg relative cursor-pointer card-wrapper'>
          <div onClick={PDFQR} className='w-full h-full card-content'>
            <img src={third} alt="PDF Data Generation" className='absolute inset-0 w-full h-full object-cover opacity-80' />
            <div className='absolute inset-0 flex flex-col justify-center items-start pl-4 text-white'>
              <div className='font-bold text-lg md:text-xl lg:text-2xl'>PDF</div>
              <div className='font-bold text-lg md:text-xl lg:text-2xl'>DATA GENERATION</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
