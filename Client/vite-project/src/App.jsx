import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify"; 
import "react-toastify/dist/ReactToastify.css";
import Login from '../pages/Login.jsx';
import LandingPage from '../pages/LandingPage.jsx';
import Register from '../pages/Register.jsx';
import Hero from '../pages/Hero.jsx';


function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<Hero />} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
      <Route path='/user' element={<LandingPage />} />
    </Routes>
    <ToastContainer position='top-right' autoClose={3000} />
    </>
  )
}

export default App
