import React from 'react'
import Navbar from "./components/Navabr"
import { Outlet } from 'react-router-dom'
import { ToastContainer } from 'react-toastify'
import "react-toastify/dist/ReactToastify.css";

const App = () => {
  return (
    <>
    <ToastContainer/>
    <Navbar/>
    <Outlet/>
    </>
  )
}

export default App
