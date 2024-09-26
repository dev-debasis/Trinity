import React from 'react'
import ReactDOM from 'react-dom/client'
import { RouterProvider, createBrowserRouter } from 'react-router-dom'
import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import ScreenShotTaker from './components/ScreenShotTaker.jsx'
import RandomDataGenerator from './components/RandomDataGenerator.jsx'
import PDFgenerator from './components/PDFgenerator.jsx'
import SignUp from './components/SignUp.jsx'



const router = createBrowserRouter([
  {
    path : "/",
    element : <App/>
  },
  {
    path : "/signup",
    element : <SignUp/>
  },
  {
    path: '/screenshot',
    element: <ScreenShotTaker/>
  },
  {
    path: '/generate-random-users-data',
    element: <RandomDataGenerator/>
  },
  {
    path: '/generate-pdf',
    element: <PDFgenerator/>
  }

])

createRoot(document.getElementById('root')).render(
  <RouterProvider router={router}/>
)
