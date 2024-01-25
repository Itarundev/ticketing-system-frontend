import React, { useContext, useEffect, useState } from 'react';
import { useNavigate, useLocation } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import "./Sidebar.css"
import Logo from "../../Assets/logo_login.svg"
import ApartmentIcon from '@mui/icons-material/Apartment';
import ConfirmationNumberIcon from '@mui/icons-material/ConfirmationNumber';
import { ThemeContext } from '../Navbar/StorageContext';
import { DetailsSharp, GraphicEqTwoTone } from '@mui/icons-material';


const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [activeRoute, setActiveRoute] = useState(location.pathname);
  const user = JSON.parse(localStorage.getItem("user"))
  const { themeClass } = useContext(ThemeContext);

  const handleListItemClick = (route) => {
    navigate(route);
    setActiveRoute(route);
  };

  return (
    <div className={themeClass}>
      <div className="sidebar_heading" >       
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


        <div className={`sidebar_item ${activeRoute === "/stats" ? "active" : ""}`} onClick={() => handleListItemClick("/stats")}>
          <GraphicEqTwoTone />
          <span>Ticket Stats</span>
        </div>
      </div>

    </div>
  );
};

export default Sidebar;
