import React, { useState } from 'react';
import { Box } from '@mui/material';
import { Button } from '@mui/material';
import { Typography } from '@mui/material';
import LogoutIcon from '@mui/icons-material/Logout';
import { useNavigate } from 'react-router-dom';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import "./Navbar.css"

const Navbar = () => {
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem('user'));


  const handleLogout = () => {
    localStorage.removeItem('user');
    localStorage.removeItem('token');
    navigate('/');
  };

  return (
    <Box className="appBar">

      <div className='appBar_left'>
       

      </div>


      <div className='appBar_right'>
        <div className='logout_btn'>
          <Button
            startIcon={<LogoutIcon />}
            className="logoutButton"
            onClick={handleLogout}
          >
            Logout
          </Button>
        </div>
        <div className='profile_info'>
          <AccountCircleOutlinedIcon />
          &nbsp;
          {user && (
            <Typography variant="h6" className="username">
              {user.brand_name}
            </Typography>
          )}
        </div>
      </div>
    </Box>

  );
};

export default Navbar;
