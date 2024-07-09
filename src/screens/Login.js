import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Login() {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  let navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = "Email is required";
    if (!formData.password) newErrors.password = "Password is required";
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formErrors = validateForm();
    if (Object.keys(formErrors).length > 0) {
      setErrors(formErrors);
      return;
    }
    try {
      const response = await fetch("https://food-delivery-web-pvcg.onrender.com/api/loginuser", {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });
      const data = await response.json();
      if (data.success) {
        // Handle redirection or other logic for successful login
        localStorage.setItem("userEmail", formData.email);
        localStorage.setItem("authToken", data.authToken);
        console.log(localStorage.getItem("authToken"));
        navigate("/");
      } else {
        alert(data.error || "Error logging in");
      }
    } catch (error) {
      alert("Network error: " + error.message);
    }
  };

  return (
    <div className='container'>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="exampleInputEmail1">Email address</label>
          <input
            type="email"
            className="form-control"
            id="exampleInputEmail1"
            aria-describedby="emailHelp"
            placeholder="Enter email"
            name="email"
            value={formData.email}
            onChange={handleChange}
          />
          {errors.email && <small className="form-text text-danger">{errors.email}</small>}
        </div>
        <div className="form-group">
          <label htmlFor="exampleInputPassword1">Password</label>
          <input
            type="password"
            className="form-control"
            id="exampleInputPassword1"
            placeholder="Password"
            name="password"
            value={formData.password}
            onChange={handleChange}
          />
          {errors.password && <small className="form-text text-danger">{errors.password}</small>}
        </div>
        <button type="submit" className="m-3 btn btn-success">
          Login
        </button>
        <Link to="/createuser" className="m-3 btn btn-danger">Create an account</Link>
      </form>
    </div>
  );
}
