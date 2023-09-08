import React, { useContext, useEffect, useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import "./Navbar.css"
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import MenuIcon from '@mui/icons-material/Menu';
import { ThemeContext } from './StorageContext';


const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));
  const [logoutBtn,setLogoutbtn]=useState('logout_btn')


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  const handletoggle=()=>{
    if(logoutBtn=='logout_btn')
    {
      setLogoutbtn('logout_btn_show')
    }
    else{
      setLogoutbtn('logout_btn')
    }
    

     
  }


  const { toggleTheme } = useContext(ThemeContext);

  const handleThemeChange = () => {
    toggleTheme();
  };

  return (
    <Box className="appBar">

      <div className='appBar_right'>
      <MenuIcon onClick={handleThemeChange}/>

        <div className='dropdown_btn'>
        <div className='profile_info d-flex' id='usm_ck' onClick={handletoggle} >
          <AccountCircleOutlinedIcon />
          &nbsp;
          {user && (
            <Typography variant="h6" className="username">
              {user.brand_name}
            </Typography>
          )}
          <ArrowDropDownIcon />
        </div>

        <div className={logoutBtn} id='usernm'>
          <Button
            startIcon={<LogoutIcon />}
            className="logoutButton"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>

        </div>
        
        
        
      </div>
    </Box>

  );
};

export default Navbar;
