import React, { useState } from "react";
import { Link, useNavigate} from 'react-router-dom';
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from 'axios';

const SignupForm = () => {
  const navigate = useNavigate();
   // State variables for username, email, and password
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: ''
  });

  // Function to handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
  };


  // Function to handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if ( !formData.username || !formData.password || !formData.email)
    {
        toast.warning("All these fields are required!");
        return;
    }
    await axios.post("http://127.0.0.1:3000/api/v1/signup", formData)
    .then(result => {
        console.log(result);
        toast.success("Registering user...")
        setTimeout(() => {
        navigate("/auth/login");
    }, 2000);
    })
    .catch(err => {
        console.log(err);
        toast.error(err?.response?.data.message || "An error occurred");
    });
  };

  return (
    <>
        <ToastContainer/>
      <div className="Auth-form-container">
      <form className="Auth-form" onSubmit={handleSubmit}>
        <div className="Auth-form-content">
          <h3 className="Auth-form-title">Sign Up</h3>
          <div className="text-center">
            Already registered?{" "}
            <Link to="/auth/login">
              Log In
            </Link>
          </div>
          <div className="form-group mt-3">
            <label>Full Name</label>
            <input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="e.g Mohammad Usman Monir"
            />
          </div>
          <div className="form-group mt-3">
            <label>Email address</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Email Address"
            />
          </div>
          <div className="form-group mt-3">
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleInputChange}
              className="form-control mt-1"
              placeholder="Password"
            />
          </div>
          <div className="d-grid gap-2 mt-3">
            <button type="submit" className="btn btn-primary">
              Submit
            </button>
          </div>
          <p className="text-center mt-2">
            <a href="#">Forgot password?</a>
          </p>
        </div>
      </form>
    </div>
    </>
  )
}

export default SignupForm;
