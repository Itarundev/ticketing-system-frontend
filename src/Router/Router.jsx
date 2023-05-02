import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login/Login'
import NotFound from '../Components/NotFound/NotFound'
import Dashboard from '../Components/Dashboard/Dashboard'
import Register from '../Components/Register/Register'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';

export default function Router() {
  const navigate = useNavigate();
  
  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
      if(User)
      {
        navigate("/dashboard")
      }
      else{
        navigate("/");
      }
  }, []);
  return (
    <div>
        <Routes>
       <Route exact path="/" element={<Login />} />
       <Route exact path="/dashboard" element={<Dashboard />} />
       <Route exact path="/register-company" element={<Register/>} />
       
         {/* <Route exact path="/signup" element={<Signup />} />
        <Route exact path="/main" element={<Merge />} /> */}
        {/* <Route exact path="/events" element={<Event />} /> */}
        <Route path="*" element={<NotFound/>} />
        </Routes>
    </div>
  )
}