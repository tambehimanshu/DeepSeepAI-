import React from 'react'
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom'
import Home from './components/Home'
import Login from './components/Login'
import Signup from './components/Signup'
import { useAuth } from './context/AuthProvider'

function App() {
  const [authUser]= useAuth();
  console.log(authUser);
  return (
   <div>
    
    <Routes>
      <Route path="/" element={authUser? <Home /> :<Navigate to={"/login"}/>} />
      <Route path="/login" element={authUser ? <Navigate to={'/'}></Navigate>: <Login />} />
      <Route path='/signup' element={authUser ? <Navigate to={'/'}></Navigate>:<Signup />} />
    </Routes>
   </div>
  )
}

export default App