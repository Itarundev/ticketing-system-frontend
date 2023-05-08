import React from 'react';
import { Box } from '@material-ui/core';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
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
