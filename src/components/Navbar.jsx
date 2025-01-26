import React, { useState, useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext'; // Import the AuthContext
import './Navbar.css';
import navbarLogo from './navbar-logo.png';
import { Button, Menu, MenuItem, Typography } from '@mui/material';

const Navbar = () => {
  const { user, logout } = useContext(AuthContext); // Get user and logout from AuthContext
  const [profileMenuAnchor, setProfileMenuAnchor] = useState(null); // State to anchor the profile menu


  // Open Profile Menu
  const handleProfileMenuOpen = (event) => {
    setProfileMenuAnchor(event.currentTarget); // Set the anchor element for the menu
  };

  // Close Profile Menu
  const handleProfileMenuClose = () => {
    setProfileMenuAnchor(null);
  };



  return (
    <nav className="navbar">
      {/* Navbar Brand */}
      <div className="navbar-brand">
        <Link to="/" className="navbar-title">
          <img src={navbarLogo} alt="Navbar Logo" className="navbar-logo" />
        </Link>
        <Link to="/" className="navbar-title">
          <Typography variant="h6" component="div">
            RecipeHub
          </Typography>
        </Link>
      </div>

      

      {/* Navbar Links */}
      <ul className={'navbar-links'}>
        <li>
          <Link to="/">Home</Link>
        </li>
        <li>
          <Link to="/add-recipe">Add Recipe</Link>
        </li>

        {/* If user is not logged in, show Login and Register */}
        {!user ? (
          <>
            <li>
              <Link to="/login">Login</Link>
            </li>
            <li>
              <Link to="/register">Register</Link>
            </li>
          </>
        ) : (
          // If user is logged in, show Profile Menu
          <li>
            <Button
              onClick={handleProfileMenuOpen}
              size="small"
              sx={{
                backgroundColor: '#FFA500', // Replace with your navbar's color
                color: 'white',
                textTransform: 'none',
                fontWeight: 'bold',
                '&:hover': {
                  backgroundColor: '#FF8C00', // Slightly darker shade for hover effect
                },
              }}
            >
              Profile
            </Button>
            <Menu
              anchorEl={profileMenuAnchor}
              open={Boolean(profileMenuAnchor)}
              onClose={handleProfileMenuClose}
            >
              <MenuItem onClick={handleProfileMenuClose}>
                <Link to="/manage-profile">Manage Profile</Link>
              </MenuItem>
              <MenuItem onClick={handleProfileMenuClose}>
                <Link to="/change-password">Change Password</Link>
              </MenuItem>
              <MenuItem
                onClick={() => {
                  logout();
                  handleProfileMenuClose();
                }}
              >
                Logout
              </MenuItem>
            </Menu>
          </li>
        )}
      </ul>
    </nav>
  );
};

export default Navbar; 







