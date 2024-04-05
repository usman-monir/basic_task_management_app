import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import axios from "axios";

const LoginForm = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.email || !formData.password) {
      toast.warning("Email and password are required!");
      return;
    }

    axios
      .post("http://127.0.0.1:3000/api/v1/login", formData)
      .then((result) => {
        console.log(result);
        toast.success("Login successful!");
        // Redirect to dashboard or other protected route
        console.log("current user" , result.data.user);
        navigate("/tasks", { state: { user: result.data.user} } );
      })
      .catch((err) => {
        console.log(err);
        toast.error(err.response.data.message || "An error occurred");
      });
  };

  return (
    <>
      <ToastContainer/>
      <div className="Auth-form-container">
        <form className="Auth-form" onSubmit={handleSubmit}>
          <div className="Auth-form-content">
            <h3 className="Auth-form-title">Log In</h3>
            <div className="text-center">
              Not registered yet? <Link to="/">Sign Up</Link>
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
            {/* <p className="forgot-password text-right mt-2">
              <Link to="#">Forgot password?</Link>
            </p> */}
          </div>
        </form>
      </div>
    </>
  );
};

export default LoginForm;
