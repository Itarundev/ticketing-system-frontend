import React, { useEffect, useState } from 'react';
import { Home } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import "./Sidebar.css"
import Logo from "../../Assets/Logo.png"

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const user = JSON.parse(localStorage.getItem("user"))

  const handleListItemClick = (route) => {
    navigate(route);
    setActiveRoute(route);
  };

  return (
    <div className="sideBar">

      <div className="sidebar_heading">

        <Typography variant="h6">
          <img src={Logo} alt="" />&nbsp;
          Genefied</Typography>
      </div>
      <div className='sidebar_list'>
        <div onClick={() => handleListItemClick("/")} className={`sidebar_item ${activeRoute === "/dashboard" ? "active" : ""}`}>
          <Home />
          <span > Home</span>
        </div>
        {user.is_admin&& <div className={`sidebar_item ${activeRoute === "/company-list" ? "active" : ""}`} onClick={() => handleListItemClick("/company-list")}>
          <AddIcon />
          <span > Company  </span>
        </div>}

        <div className={`sidebar_item ${activeRoute === "/ticket-create" ? "active" : ""}`} onClick={() => handleListItemClick("/ticket-create")}>
          <CreateIcon />
          <span> Create Ticket</span>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
