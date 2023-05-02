import React, { useEffect, useState } from 'react';
import './Register.css';

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
    const [token,setToken]=useState('')

    useEffect(()=>{
      setToken(localStorage.getItem("token")) 
    },[])
  
    // const handleAddressChange = (e) => {
    //   setAddress({
    //     ...address,
    //     [e.target.name]: e.target.value,
    //   });
    // };
  
  
    const handleSubmit = (e) => {
      e.preventDefault();
      fetch("http://localhost:8004/api/register", {
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
          mobile_no:mobileNo,
          email,
          password
        }),
      })
        .then((response) => response.json())
        .then((data) => console.log(data))
        .catch((error) => console.log(error));
    };
  
    return (
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="brandName">Brand Name</label>
            <input type="text" className="form-control" id="brandName" placeholder="Enter brand name" value={brand_name} onChange={(e) => setBrandName(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="contactPerson">Contact Person</label>
            <input type="text" className="form-control" id="contactPerson" placeholder="Enter contact person" value={contact_person} onChange={(e) => setContactPerson(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="project">Project</label>
            <input type="text" className="form-control" id="project" placeholder="Enter project name" value={project} onChange={(e) => setProject(e.target.value)} required/>
          </div>
          <div className="form-group">
  <label htmlFor="street">Street</label>
  <input type="text" className="form-control" id="street" placeholder="Enter street" value={address.street} onChange={(e) => setAddress({...address, street: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="city">City</label>
  <input type="text" className="form-control" id="city" placeholder="Enter city" value={address.city} onChange={(e) => setAddress({...address, city: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="state">State</label>
  <input type="text" className="form-control" id="state" placeholder="Enter state" value={address.state} onChange={(e) => setAddress({...address, state: e.target.value})} />
</div>
<div className="form-group">
  <label htmlFor="zip">Zip Code</label>
  <input type="text" className="form-control" id="zip" placeholder="Enter zip code" value={address.zip} onChange={(e) => setAddress({...address, zip: e.target.value})} />
</div>
          <div className="form-group">
            <label htmlFor="mobileNo">Mobile number</label>
            <input type="tel" className="form-control" id="mobileNo" placeholder="Enter mobile number" value={mobileNo} onChange={(e) => setMobileNo(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="email">Email address</label>
            <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} required/>
          </div>
          <div className="form-group">
            <label htmlFor="password">Password</label>
            <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} required/>
          </div>
          <button type="submit" className="btn btn-primary">Submit</button>
        </form>
      </div>
    );
  }
  
