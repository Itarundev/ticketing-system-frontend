import React, { useEffect, useState } from 'react';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container } from 'react-bootstrap';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./Dashboard.css"
import { IconButton } from '@material-ui/core';
import Tooltip from '@mui/material/Tooltip';



const Dashboard = () => {
  const [token, setToken] = useState('');
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const [user, setUser] = useState({});

  useEffect(() => {
    setToken(localStorage.getItem("token"))
    setUser(JSON.parse(localStorage.getItem("user")))
  }, [])

  const getAllTickets = () => {
    axios.get('http://localhost:8004/api/all-ticket', {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) =>
        setTickets(response.data.tickets))
      .catch((error) => console.log(error));
  }

  useEffect(() => {
    if (token) {
      getAllTickets()
    }
  }, [token])

  const handleDelete = (ticket) => {

    axios.delete(`http://localhost:8004/api/delete-ticket/${ticket.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Deleted successfully!');
        getAllTickets()
      })
      .catch((error) => {
        toast.error(error);
        console.log(error)
      })
  }


  return (



    <div className='dashboard_grid'>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Container>
          <div>
            <Table className="table" aria-label="tickets table">
              <TableHead>
                <TableRow>
                  <TableCell> <h3>ID</h3></TableCell>
                  <TableCell> <h3>Support Type</h3></TableCell>
                  <TableCell><h3>Support Related To</h3></TableCell>
                  <TableCell><h3>Title</h3></TableCell>
                  <TableCell><h3>Description</h3></TableCell>
                  <TableCell><h3>Facing Issue On</h3></TableCell>
                  <TableCell><h3>Created By</h3></TableCell>
                  <TableCell><h3>Status</h3></TableCell>
                  <TableCell><h3>Created At</h3></TableCell>
                  <TableCell><h3>Actions</h3></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {tickets.map((ticket) => (
                  <TableRow key={ticket.id}>
                    <TableCell>{ticket.id}</TableCell>
                    <TableCell>{ticket.support_type}</TableCell>
                    <TableCell>{ticket.support_relatedto}</TableCell>
                    <TableCell>{ticket.title}</TableCell>
                    <TableCell>{ticket.description}</TableCell>
                    <TableCell>{ticket.facing_issue_on}</TableCell>
                    <TableCell>{ticket.createdBy}</TableCell>
                    <TableCell>{ticket.status}</TableCell>
                    <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
                    <TableCell>
                      {/* <button onClick={() => {
                        const encodedData = encodeURIComponent(JSON.stringify(ticket));
                        navigate(`/ticket-view?data=${encodedData}`)
                      }}>View</button> */}
                      <div className='dltview'>
                        <Tooltip title="View" arrow>
                          <IconButton>
                            <RemoveRedEyeIcon onClick={() => {
                              const encodedData = encodeURIComponent(JSON.stringify(ticket));
                              navigate(`/ticket-view?data=${encodedData}`)
                            }} />
                          </IconButton>
                        </Tooltip>
                        {user.isAdmin &&
                          <Tooltip title="Delete" arrow>
                            <IconButton>

                              < DeleteIcon onClick={() => handleDelete(ticket)} />

                            </IconButton>
                          </Tooltip>
                        }



                      </div>


                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </Container>

        <ToastContainer />
      </div>

    </div>
  );
};

export default Dashboard;



