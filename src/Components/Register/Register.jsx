import React, { useEffect, useState } from 'react';
import './Register.css';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from "react-router-dom";
import Navbar from '../Navbar/Navbar';
import Sidebar from '../Sidebar/Sidebar';
import { Container } from '@mui/material';

export default function Register() {
  const [brand_name, setBrandName] = useState('');
  const [contact_person, setContactPerson] = useState('');
  const [project, setProject] = useState('');
  const [mobileNo, setMobileNo] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [address, setAddress] = useState({
    street: '',
    city: '',
    state: '',
    zip: '',
  });
  const navigate = useNavigate();
  const token = localStorage.getItem("token")




  const handleSubmit = (e) => {
    e.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${token}`
      },
      body: JSON.stringify({
        brand_name,
        contact_person,
        project,
        address,
        mobile_no: mobileNo,
        email,
        password
      }),
    }).then((response) => {
      if (response.ok) {
        return response.json().then((data) => {
          // Access response message
          const message = data.message;
          toast.success(message);
          setTimeout(() => {
            navigate("/company-list")
          }, 1000)
        });
      } else {
        return response.json().then((data) => {
          // Access error message
          const message = data.message;
          toast.error(message);
        });
      }
    })
      .catch((error) => {
        console.log(error);
      });


  };

  return (

    <div className='dashboard_grid'>
      <div>
        <Sidebar />
      </div>
      <div>
        <Navbar />
        <Container>
          <div className='title_txt'>
          <h1>Add New Company</h1>
          </div>
          <div className="register-container">
           
            <form onSubmit={handleSubmit} className='frmdf'>
              <div className="form-group">
                <label htmlFor="brandName">Brand Name</label>
                <input type="text" className="" id="brandName" placeholder="Enter brand name" value={brand_name} onChange={(e) => setBrandName(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="contactPerson">Contact Person</label>
                <input type="text" className="" id="contactPerson" placeholder="Enter contact person" value={contact_person} onChange={(e) => setContactPerson(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="project">Project</label>
                <input type="text" className="" id="project" placeholder="Enter project name" value={project} onChange={(e) => setProject(e.target.value)} required />
              </div>
              <div className='forbox'>
              <div className="form-group">
                <label htmlFor="street">Street</label>
                <input type="text" className="" id="street" placeholder="Enter street" value={address.street} onChange={(e) => setAddress({ ...address, street: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="city">City</label>
                <input type="text" className="" id="city" placeholder="Enter city" value={address.city} onChange={(e) => setAddress({ ...address, city: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="state">State</label>
                <input type="text" className="" id="state" placeholder="Enter state" value={address.state} onChange={(e) => setAddress({ ...address, state: e.target.value })} />
              </div>
              <div className="form-group">
                <label htmlFor="zip">Zip Code</label>
                <input type="text" className="form-control" id="zip" placeholder="Enter zip code" value={address.zip} onChange={(e) => setAddress({ ...address, zip: e.target.value })} />
              </div></div>
              <div className="form-group">
                <label htmlFor="mobileNo">Mobile number</label>
                <input type="tel" className="" id="mobileNo" placeholder="Enter mobile number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="email">Email address</label>
                <input type="email" className="" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required />
              </div>
              <div className="form-group">
                <label htmlFor="password">Password</label>
                <input type="password" className="" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required />
              </div>
              <div className="bnsx">            
              <button type="submit" className="btn btn-primary submitBtn">Submit</button>
              </div>
            </form>
            <ToastContainer />
          </div>
        </Container>
      </div>

    </div>
  );
}

