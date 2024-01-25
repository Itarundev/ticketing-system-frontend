import React from 'react'
import { Route, Routes } from 'react-router-dom'
import Login from '../Components/Login/Login'
import NotFound from '../Components/NotFound/NotFound'
import Dashboard from '../Components/Dashboard/Dashboard'
import Register from '../Components/Register/Register'
import TicketForm from '../Components/CreateTicket/CreateTicket'
import Ticket from '../Components/ViewTicket/Ticket'
import Company from '../Components/Company/Company'
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import TicketStats from '../Components/Stats/TicketStats'



export default function Router() {
  const navigate = useNavigate();
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  useEffect(() => {
      if(!user&&!token)
      {
        navigate("/")
      }
  }, []);
  return (
    <div>
      <Routes>
      <Route path="*" element={<NotFound />} />
        <Route exact path="/" element={<Login />} />
        {
          user&&token&&<>
          <Route exact path="/dashboard" element={<Dashboard />} />
          <Route exact path="/company-list" element={<Company />} />
          <Route exact path="/register-company" element={<Register />} />
          <Route exact path="/ticket-view" element={<Ticket />} />
          <Route exact path="/ticket-create" element={<TicketForm />} />
          <Route exact path="/stats" element={<TicketStats />} />
          </>
        }  
      </Routes>
    </div>
  )
}