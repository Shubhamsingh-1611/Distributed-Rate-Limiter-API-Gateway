import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
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
    </>
  )
}

export default App
