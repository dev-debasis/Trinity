import React from 'react'
import Navbar from './components/Navbar'
import HomePage from './components/HomePage'

const App = () => {
  return (
    // <div className="h-screen  bg-gradient-to-r from-[#041330] via-[#040D21] to-[#0b254e] font-['Nunito Sans']" >
    //   <Navbar/>
      
    //   <HomePage/>
    // </div>

    
    <div className="overflow-auto h-screen bg-gradient-to-r from-[#041330] via-[#040D21] to-[#081a36] font-['Nunito Sans'] no-scrollbar">
    
    <Navbar />
    <div className="m-16">
      <HomePage />
    </div>
  </div>
  )
}

// <div class="min-h-screen bg-gradient-to-r from-[#041330] via-[#040D21] to-[#0b254e]">

export default App
