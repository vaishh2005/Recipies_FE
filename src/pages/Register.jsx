import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Register.css";
import MessageService from '../services/MessageService'; // Import the MessageService component
import { BASE_URL } from '../config/condif';

const Register = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
  });

  const [message, setMessage] = useState(""); // State for the message content
  const [type, setType] = useState(""); // State for the message type ('success' or 'error')
  const [open, setOpen] = useState(false); // State for Snackbar visibility

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleClose = () => {
    setOpen(false); // Close the Snackbar
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/register`, formData);
      if(response.status === 200 || 201){
      // Show success message and navigate to another page if needed
        setMessage("Registration successful! Redirecting...");
        setType("success");
        setOpen(true);
        setTimeout(() => navigate("/login"), 3000); // Redirect after 3 seconds
      }
      
    } catch (error) {
      console.error("Error:", error);

      // Show error message
      if (error.response) {
        setMessage(error.response.data.message || "Registration failed");
      } else {
        setMessage("Registration failed. Please try again.");
      }
      setType("error");
      setOpen(true);
    }
  };

  return (
    <div className="register-component">
      <div className="register-container">
        <h2>Register</h2>
        <form onSubmit={handleSubmit} className="register-form">
          <input
            type="text"
            name="name"
            placeholder="Name"
            value={formData.name}
            onChange={handleChange}
            required
          />
          <input
            type="email"
            name="email"
            placeholder="Email"
            value={formData.email}
            onChange={handleChange}
            required
          />
          <input
            type="password"
            name="password"
            placeholder="Password"
            value={formData.password}
            onChange={handleChange}
            required
          />
          <button type="submit">Register</button>
        </form>
      </div>

      {/* Integrate MessageService */}
      <MessageService
        message={message}
        type={type}
        open={open}
        handleClose={handleClose}
      />
    </div>
  );
};

export default Register;

