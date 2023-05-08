import React, { useEffect, useState } from 'react';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import HomeIcon from '@material-ui/icons/Home';
import Typography from '@material-ui/core/Typography';
import { useNavigate } from "react-router-dom";
import CreateIcon from '@mui/icons-material/Create';
import AddIcon from '@mui/icons-material/Add';
import "./Sidebar.css"
import Logo from "../../Assets/Logo.png"



const Sidebar = () => {
  const [user, setUser] = useState({})
  const navigate = useNavigate();

  useEffect(() => {
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const handleListItemClick = (route) => {
    navigate(route);
  };

  return (
    <div className="sideBar">

      <div className="sidebar_heading">

        <Typography variant="h6">
          <img src={Logo} alt="" />&nbsp;
          Genefied</Typography>
      </div>
      <div className='sidebar_list'>
        <div onClick={() => handleListItemClick("/")} className='sidebar_item'>
          <HomeIcon />
          <span > Home</span>
        </div>
        {user.isAdmin && <div className='sidebar_item' onClick={() => handleListItemClick("/register-company")}>
          <AddIcon />
          <span > Add Company  </span>
        </div>}

        <div className='sidebar_item' onClick={() => handleListItemClick("/ticket-create")}>
          <CreateIcon />
          <span> Create Ticket</span>
        </div>
        {/* <ListItem button >
            <div><HomeIcon /></div>
            <ListItemText primary="Home" className="listItemText" />
          </ListItem>
          <ListItem button onClick={() => handleListItemClick("/register-company")}>
            <ListItemIcon><AddIcon /></ListItemIcon>
            <ListItemText primary="Add Company" className="listItemText" />
          </ListItem>

          <ListItem button onClick={() => handleListItemClick("/ticket-create")}>
            <ListItemIcon><CreateIcon /></ListItemIcon>
            <ListItemText primary="Create Ticket" className="listItemText" />
          </ListItem> */}
      </div>



    </div>
  );
};

export default Sidebar;

// background: #4caf50;
//     padding: 1rem;
//     display: flex;
//     align-items: center;
//     justify-content: space-between;

    // overflow: auto;
    // height: 100%;