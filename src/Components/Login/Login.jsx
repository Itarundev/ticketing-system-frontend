import React, { useState } from 'react';
import './Login.css';
import { useNavigate } from "react-router-dom";
import { useEffect } from 'react';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    const User = JSON.parse(localStorage.getItem("user"));
    if (User) {
      navigate("/dashboard")
    }
    else {
      navigate("/");
    }
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();
    fetch(`${process.env.REACT_APP_BASE_URL}/api/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password
      }),
    })
      .then((response) => {
        if (response.ok) {
          return response.json().then((data) => {
            // Access response message
            const message = data.message;
            toast.success(message);
            setTimeout(() => {
              localStorage.setItem("token", data.token);
              localStorage.setItem("user", JSON.stringify(data.company));
              navigate("/dashboard")
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
      .then((data) => {
        // Set the JWT token and header in local storage
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.company));
        navigate("/dashboard")

      })
      .catch((error) => console.log(error));
  };

  return (
    <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">Email address</label>
          <input type="email" className="form-control" id="email" aria-describedby="emailHelp" placeholder="Enter email" value={email} onChange={(e) => setEmail(e.target.value)} />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
          <input type="password" className="form-control" id="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
        </div>
        <button type="submit" className="btn btn-primary">Submit</button>
      </form>
      <ToastContainer/>
    </div>
  );
}
