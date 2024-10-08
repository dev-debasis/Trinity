import React from 'react';
import { useNavigate } from 'react-router-dom';
import logo from '../assets/images/logo.png';

const Logo = () => {
  let navigate = useNavigate(); 
  const routeChange = () =>{ 
    let path = `/`; 
    navigate(path);
  }
  return (
    <div onClick={routeChange} className="flex items-center ml-10 cursor-pointer">
      <img src={logo} alt="Company Logo" className="h-7 w-auto " />
      <span  className="text-white text-xl ml-4 font-bold text-[#8995a7d9] text-[1rem]">HackOver</span>
    </div>
  );
};


export default Logo;