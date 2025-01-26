import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';
import MessageService from '../services/MessageService';
import './Login.css';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState(''); // State to hold message
  const [messageType, setMessageType] = useState(''); // success or error
  const [open, setOpen] = useState(false); // State to control the snackbar visibility
  const { login } = useContext(AuthContext);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await login(email, password);
      setMessage('Login successful!');
      setMessageType('success');
      setOpen(true); // Show message
    } catch (error) {
      setMessage('Login failed. Please check your credentials.');
      setMessageType('error');
      setOpen(true); // Show error message
    }

    // Close the message after 5 seconds
    setTimeout(() => {
      setOpen(false);
    }, 5000);
  };

  return (
   <div className='login-component'>
     <div className="login-container">
      <h2>Login</h2>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button type="submit">Login</button>
      </form>

      {/* MessageService Snackbar */}
      <MessageService
        message={message}
        type={messageType}
        open={open}
        handleClose={() => setOpen(false)}
      />
    </div>
   </div>
  );
};

export default Login;
