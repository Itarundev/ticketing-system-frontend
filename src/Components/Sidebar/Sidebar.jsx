import React, { useContext, useEffect, useState } from 'react';
import { Home } from '@mui/icons-material';
import { Typography } from '@mui/material';
import { useNavigate, useLocation } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import "./Sidebar.css"
import Logo from "../../Assets/logo_login.svg"
import ApartmentIcon from '@mui/icons-material/Apartment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import MenuIcon from '@mui/icons-material/Menu';
import { LocalStorageContext } from '../Navbar/StorageContext';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const user = JSON.parse(localStorage.getItem("user"))
  const[classChange,setClassChange]=useState(localStorage.getItem('side')||'sidebar')
  const localStorageValue = useContext(LocalStorageContext);

  useEffect(()=>{
console.log(localStorageValue,"Local")
  },[localStorageValue])

  const classChangefun=()=>{
    if(classChange==='sideBar')
    {
      setClassChange("sideBar hide_nav")
    }else{
      setClassChange("sideBar")
    }
  
  }

  const handleListItemClick = (route) => {
    navigate(route);
    setActiveRoute(route);
  };

  return (
    <div className={localStorageValue}>
      <div className="sidebar_heading" onClick={classChangefun}>       
          <img src={Logo} alt="" className='img-res'  />    
          {/* <div className='appBar_left'>     
      <MenuIcon />
      </div>       */}
      </div>
      <div className='sidebar_list'>
        <div onClick={() => handleListItemClick("/")} className={`sidebar_item ${activeRoute === "/dashboard" ? "active" : ""}`}>
          <ConfirmationNumberIcon />
          <span > All Tickets</span>
        </div>
        {user.is_admin&& <div className={`sidebar_item ${activeRoute === "/company-list" ? "active" : ""}`} onClick={() => handleListItemClick("/company-list")}>
          <ApartmentIcon />
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
