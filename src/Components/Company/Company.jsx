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
import { ToastContainer, toast} from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Container, TablePagination } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import "./Company.css"



const Company = () => {
  const [companies, setCompanies] = useState([]);
  const navigate = useNavigate();
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [totalCount, setTotalCount] = useState(0)
  const token=localStorage.getItem("token")

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
    getAllCompanies()
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(parseInt(event.target.value, 10));
    setPage(0);
  };

  const getAllCompanies = () => {
    axios.get(`${process.env.REACT_APP_BASE_URL}/api/get-all-companies?limit=${rowsPerPage}&page=${page + 1}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
      .then((response) =>
      {
        setCompanies(response.data.companies)
        setTotalCount(response.data.totalCount)
      })
      .catch((error) => console.log(error));
  }

  useEffect(() => {
      getAllCompanies()
  }, [page,rowsPerPage])

  const handleDelete = (company) => {

    axios.delete(`${process.env.REACT_APP_BASE_URL}/api/delete-company/${company.id}`,
      {
        headers: {
          Authorization: `Bearer ${token}`
        }
      })
      .then((response) => {
        console.log(response.data);
        toast.success('Deleted successfully!');
        getAllCompanies()
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
        <div className='Add_company_btn'>
           <button onClick={()=>navigate('/register-company')}>
            Add Company
           </button>
        </div>
        <div className='responsive-table'>
            <Table className="table tblall" aria-label="tickets table">
              <TableHead>
                <TableRow>
                  <TableCell> <h3>ID</h3></TableCell>
                  <TableCell> <h3>Brand Name</h3></TableCell>
                  <TableCell><h3>Contact Person</h3></TableCell>
                  <TableCell><h3>Email</h3></TableCell>
                  <TableCell><h3>Project</h3></TableCell>
                  <TableCell><h3>Mobile No.</h3></TableCell>
                  <TableCell><h3>Created At</h3></TableCell>
                  <TableCell><h3>Delete</h3></TableCell>
                  
                </TableRow>
              </TableHead>
              <TableBody>
                {companies.map((company,index) => (
                  <TableRow key={company.id}>
                      <TableCell>{page * rowsPerPage + index+1}</TableCell>
                    <TableCell>{company.brand_name}</TableCell>
                    <TableCell>{company.contact_person}</TableCell>
                    <TableCell>{company.email}</TableCell>
                    <TableCell>{company.project}</TableCell>
                    <TableCell>{company.mobile_no}</TableCell>
                    <TableCell>{new Date(company.created_at).toLocaleString()}</TableCell>

                    
                    <TableCell className='single_delet'><DeleteIcon onClick={()=>{handleDelete(company)}}/></TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            <TablePagination className='pagging_bx1'
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

export default Company;



