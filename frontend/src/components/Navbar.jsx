import { Link, redirect, useNavigate } from "react-router-dom";
import React, { useState, useEffect } from "react";
import Logo from "./Logo";
import userImg from "../assets/images/user.jpg"

const Navbar = () => {
  const [isScrollingUp, setIsScrollingUp] = useState(false);
  const [lastScrollY, setLastScrollY] = useState(0);

  const handleScroll = () => {
    if (window.scrollY > lastScrollY) {
      // Scrolling Down
      setIsScrollingUp(false);
    } else {
      // Scrolling Up
      setIsScrollingUp(true);
    }
    setLastScrollY(window.scrollY);
  };

  
  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [lastScrollY]);

  const [isOpen, setIsOpen] = useState(0);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };
  const [isUser, setisUser] = useState(0);
  return (
    // <div className="fixed w-screen text-[#8193B2]">
    <div className="fixed top-0 left-0 right-0 z-50 transition-transform duration-300 ease-in-out ${isScrollingUp ? 'transform translate-y-0' : 'transform -translate-y-full'}">
      <div className="overflow-hidden">
        <div className="flex justify-between space-x-8 p-3 bg-transparent items-center">
          <div>
            <Logo />
          </div>
          <div className="pr-10 flex ">
            <Link
              to="/"
              className="relative text-[#8995a7d9] text-[0.81rem] font-medium py-2 px-5 transition duration-500 hover:text-cyan-400 group uppercase"
            >
              Home
              <span className="absolute inset-0 border-b-2 border-cyan-400 rounded-md scale-0 translate-y-12 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"></span>
            </Link>
            <Link
              to="/screenshot"
              className="relative text-[#8995a7d9] text-[0.81rem] font-medium py-2 px-5 transition duration-500 hover:text-cyan-400 group uppercase"
            >
              WebSnap
              <span className="absolute inset-0 border-b-2 border-cyan-400 rounded-md scale-0 translate-y-12 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"></span>
            </Link>
            <Link
              to="/generate-random-users-data"
              className="relative text-[#8995a7d9] text-[0.81rem] font-medium py-2 px-5 transition duration-500 hover:text-cyan-400 group uppercase"
            >
              UserGen
              <span className="absolute inset-0 border-b-2 border-cyan-400 rounded-md scale-0 translate-y-12 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"></span>
            </Link>
            <Link
              to="/generate-pdf"
              className="relative text-[#8995a7d9] text-[0.81rem] font-medium py-2 px-5 transition duration-500 hover:text-cyan-400 group uppercase"
            >
              PDF QR
              <span className="absolute inset-0 border-b-2 border-cyan-400 rounded-md scale-0 translate-y-12 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"></span>
            </Link>
            <Link
              to={isUser? "/user  ":"/signup"}
              className="relative text-[#8995a7d9] text-[0.81rem] font-medium py-2 px-5 transition duration-500 hover:text-cyan-400 group uppercase"
            >{isUser? <img className="h-5 m-0 rounded-full w-auto" src={userImg} alt="user" />:"Sign Up"}
            <span className="absolute inset-0 border-b-2 border-cyan-400 rounded-md scale-0 translate-y-12 opacity-0 group-hover:scale-100 group-hover:translate-y-0 group-hover:opacity-100 transition duration-500"></span>
            </Link>
          </div>
        </div>
        <div className="border border-[#313E57] mx-8 box-border"></div>
      </div>
    </div>
  );
};

export default Navbar;
