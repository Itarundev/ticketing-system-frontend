import React, { useEffect, useState } from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import { useNavigate } from "react-router-dom";
import axios from 'axios';
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TableSortLabel } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import RemoveRedEyeIcon from '@mui/icons-material/RemoveRedEye';
import "./Dashboard.css"
import { IconButton } from '@mui/material';
import Tooltip from '@mui/material/Tooltip';
import TablePagination from '@mui/material/TablePagination';
import { CSVLink } from 'react-csv';



const Dashboard = () => {
  const token = localStorage.getItem("token")
  const user = JSON.parse(localStorage.getItem("user"))
  const [tickets, setTickets] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0)
  const [orderBy, setOrderBy] = useState('created_at');
  const [order, setOrder] = useState('desc');
  const [allProjects, setAllProjects] = useState([])
  const [csvTickets, setCsvTickets] = useState([])
  const [request, setRequest] = useState({
    created_by_name: '',
    status: '',
    project_name: '',
    startDate: '',
    endDate: new Date().toISOString().substring(0, 10)
  })

  const clearFilters = () => {
    setRequest({
      ...request,
      created_by_name: '',
      status: '',
      project_name: '',
      startDate: '',
      endDate: new Date().toISOString().substring(0, 10),
    });
    getAllTickets({
      created_by_name: '',
      status: '',
      project_name: '',
      startDate: '',
      endDate: new Date().toISOString().substring(0, 10),
    })
  };
  

  const handleStartDateChange = (e) => {
    setRequest({ ...request, startDate: e.target.value })
  };

  const handleEndDateChange = (e) => {
    setRequest({ ...request, endDate: e.target.value })
  };

  const handleSort = (property) => {
    if (orderBy === property) {
      setOrder(order === 'asc' ? 'desc' : 'asc');
    } else {
      setOrderBy(property);
      setOrder('desc');
    }
  };

  if(tickets.length)
  {
    tickets.sort((a, b) => {
      const isAsc = order === 'asc';
      if (a[orderBy] < b[orderBy]) {
        return isAsc ? -1 : 1;
      }
      if (a[orderBy] > b[orderBy]) {
        return isAsc ? 1 : -1;
      }
      return 0;
    });
  }



  const handleSearch = (e) => {
    setRequest({ ...request, created_by_name: e.target.value })
  }
  const handleChange = (e) => {
    setRequest({ ...request, project_name: e.target.value })
  };


  const getAllTickets = async(request) => {
    if (new Date(request.startDate) > new Date(request.endDate)) {
      alert('Start date cannot be greater than end date');
      return;
    }
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/all-ticket?limit=${rowsPerPage}&page=${page + 1}`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data: request
    }
    await axios(config)
      .then((response) => {
          setTickets(response.data.tickets);
        if(response.data.count)
        {
          setTotalCount(response.data.count)
        }
      }
      )
      .catch((error) => console.log(error));
  }

  const formatDate=(dateString)=> {
    const date = new Date(dateString);
    return `${date.getDate().toString().padStart(2, '0')}-${(date.getMonth() + 1).toString().padStart(2, '0')}-${date.getFullYear().toString().slice(-2)}`;
  }

  const getCSVTickets = () => {
    const config = {
      method: "post",
      url: `${process.env.REACT_APP_BASE_URL}/api/all-ticket`,
      headers: {
        "Content-Type": "application/json",
        Authorization: "Bearer " + token,
      },
      data:
        request
    }
    axios(config)
      .then((response) => {
        const newData = response.data.tickets.map((obj,index) => {
          const newObj = {};
          newObj['index'] = index+1;
          newObj['projectName'] = obj['project_name'];
          newObj['supportType'] = obj['support_type'];
          newObj['supportRelatedTo'] = obj['support_related_to'];
          newObj['title'] = obj['title'];
          newObj['description'] = obj['description'];
          newObj['facingIssueOn'] = obj['facing_issue_on'];
          newObj['createdByName'] = obj['created_by_name'];
          newObj['createdAt'] = formatDate(obj.created_at);
          newObj['updatedAt'] = formatDate(obj.updated_at);
          newObj['status'] = obj['status'];
          return newObj;
        });
        setCsvTickets(newData)
      }
      )
      .catch((error) => console.log(error));
  }
  useEffect(()=>{
    getCSVTickets()
    if (user.is_admin) {
      getAllProjects()
    }
  },[])

  useEffect(() => {
    getAllTickets(request)
  }, [page,rowsPerPage]);

  const handleDelete = (ticket) => {

    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete-ticket/${ticket.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Deleted successfully!');
        getAllTickets(request)
      })
      .catch((error) => {
        toast.error(error);
        console.log(error)
      })
  }


  const handleChangePage = ( event,newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllProjects = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-projects`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((res) => {
        setAllProjects(res.data.projects)
      })
  }
  return (
    <div className='dashboard_grid'>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar handleSearch={handleSearch} />
        <Container>
          <div>
            <div className='status_btn'>
              <div>
                {user.is_admin &&
                  <>
                    <input type="text" className="search_input" placeholder="Search" onChange={handleSearch} />
                  </>
                }
              </div>
              <div>
                <label>Status:</label>
                <select className='status_select' name="status" value={request.status} onChange={(e) => setRequest({ ...request, status: e.target.value })}>
                  <option value="">All</option>
                  <option value="Pending">Pending</option>
                  <option value="In Progress">In Progress</option>
                  <option value="Resolved">Resolved</option>
                </select>
              </div>

              <div>
                <label htmlFor="startDate">Start Date</label>
                <input type="date" id="startDate" value={request.startDate} onChange={handleStartDateChange} />
              </div>
              <div>
                <label htmlFor="endDate">End Date</label>
                <input type="date" id="endDate" value={request.endDate} onChange={handleEndDateChange} />
              </div>
              <div>
                {user.is_admin && allProjects.length > 0 && (
                  <div>
                    <label>Project:</label>
                    <select onChange={handleChange} value={request.project_name} className='status_select'>
                      <option value="">Select a project</option>
                      {allProjects.map((project, index) => (
                        <option key={index} value={project}>{project}</option>
                      ))}
                    </select>
                  </div>
                )}
              </div>
              <div >
                <button onClick={()=>{
                  getAllTickets(request)
                  getCSVTickets()
                }
                }>
                  Search
                </button>
              </div>
              <div className='csvdiv' >
                <CSVLink className='csvbtn' data={csvTickets} filename={'my-table-data.csv'}>
                  Export to CSV
                </CSVLink>

              </div>
<div onClick={clearFilters}>
  Clear Filters
</div>
            </div>

            <Table className="table" aria-label="tickets table">
              <TableHead>

                <TableRow>
                  <TableCell> <h3>ID</h3></TableCell>
                  {user.is_admin && <TableCell> <h3>Project</h3></TableCell>}
                  <TableCell> <h3>Support Type</h3></TableCell>
                  <TableCell><h3>Support Related To</h3></TableCell>
                  <TableCell><h3>Title</h3></TableCell>
                  <TableCell><h3>Facing Issue On</h3></TableCell>
                  <TableCell><h3>Created By</h3></TableCell>
                  <TableCell><h3>Status</h3>
                  </TableCell>
                  <TableCell>
                    <TableSortLabel
                      active={orderBy === 'created_at'}
                      direction={orderBy === 'created_at' ? order : 'asc'}
                      onClick={() => handleSort('created_at')}
                    >
                      <h3>Created At</h3>
                    </TableSortLabel>
                  </TableCell>
                  <TableCell><h3>Actions</h3></TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                { tickets && 
                tickets.map((ticket, index) => (
                    <TableRow key={ticket.id}>
                      <TableCell>{page * rowsPerPage + index+1}</TableCell>
                      {user.is_admin && <TableCell> {ticket.project_name}</TableCell>}
                      <TableCell>{ticket.support_type}</TableCell>
                      <TableCell>{ticket.support_related_to}</TableCell>
                      <TableCell>{ticket.title}</TableCell>
                      <TableCell>{ticket.facing_issue_on}</TableCell>
                      <TableCell>{ticket.created_by_name}</TableCell>
                      <TableCell>{ticket.status}</TableCell>
                      <TableCell>{new Date(ticket.created_at).toLocaleString()}</TableCell>
                      <TableCell>
                        <div className='dltview'>
                          <Tooltip title="View" arrow>
                            <IconButton>
                              <RemoveRedEyeIcon onClick={() => {
                                const encodedData = encodeURIComponent(JSON.stringify(ticket));
                                navigate(`/ticket-view?data=${encodedData}`)
                              }} />
                            </IconButton>
                          </Tooltip>
                          {user.is_admin &&
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
            <TablePagination
              rowsPerPageOptions={[5, 10, 25]}
              component="div"
              count={totalCount}
              rowsPerPage={rowsPerPage}
              page={page}
              onPageChange={handleChangePage}
              onRowsPerPageChange={handleChangeRowsPerPage}
            />
          </div>
        </Container>
        <ToastContainer />
      </div>
    </div>
  );

};

export default Dashboard;



