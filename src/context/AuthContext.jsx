import React, { createContext, useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { BASE_URL } from '../config/condif';

// Create the AuthContext
export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true); // To track if authentication state is being restored
  const navigate = useNavigate();

  useEffect(() => {
    // Restore token and user from localStorage
    const token = localStorage.getItem('token');
    const usrname = localStorage.getItem('usrname');
    if (token && usrname) {
      setUser(usrname);
    }
    setLoading(false); // Mark as done loading
  }, []);

  // Login function
  const login = async (email, password) => {
    try {
      const response = await axios.post(`${BASE_URL}/api/auth/login`, {
        email,
        password,
      });
      localStorage.setItem('token', response.data.token); // Save token in localStorage
      localStorage.setItem('usrname', response.data.name);
      setUser(response.data.name); // Set user data
      setTimeout(() => {
        navigate('/'); // Navigate to home page after login
      }, 1500);
    } catch (error) {
      console.error('Login failed:', error.message);
      throw error;
    }
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem('token'); // Remove token from localStorage
    localStorage.removeItem('usrname'); // Remove user data from localStorage
    setUser(null); // Clear user data
    navigate('/login'); // Redirect to login page
  };

  if (loading) {
    return <div>Loading...</div>; // Render a loader while restoring auth state
  }

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;

