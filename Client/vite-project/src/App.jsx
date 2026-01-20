import { useState } from 'react'
import { Routes, Route } from 'react-router-dom';
import Login from '../pages/Login.jsx';
import Register from '../pages/Register.jsx';

function App() {


  return (
    <>
     <Routes>
      <Route path="/" element={<div>Welcome to the Home page</div>} />
      <Route path="/login" element={<Login/>} />
      <Route path="/register" element={<Register/>} />
    </Routes>
    </>
  )
}

export default App
