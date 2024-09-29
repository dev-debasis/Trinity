import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'

const App = () => {
  return (    
    <div className="overflow-auto h-screen bg-gradient-to-r from-[#041330] via-[#040D21] to-[#081a36] font-['Nunito Sans'] no-scrollbar">
    
    <Navbar />
    <div className="m-16">
      <HomePage />
    </div>
  </div>
  )
}


export default App
