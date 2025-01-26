import React, { useContext, useState } from 'react';
import { TextField, Button, Snackbar, Alert } from '@mui/material';
import { BASE_URL } from '../config/condif';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const ChangePassword = () => {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmNewPassword, setConfirmNewPassword] = useState('');
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [snackbarType, setSnackbarType] = useState('success'); // 'success' or 'error'
  const [openSnackbar, setOpenSnackbar] = useState(false);
  const navigate=useNavigate()

  const chnagePassword = async (password, newpassword) => {
    try {
      console.log(newPassword);
      
      const authToken = localStorage.getItem('token');
      const usrname = localStorage.getItem('usrname'); // Retrieve the token from localStorage (or your preferred storage)
       // Retrieve the token from localStorage (or your preferred storage)
      const response = await axios.post(
        `${BASE_URL}/api/auth/changepassword`,
        {
          password,
          newPassword,
          usrname
        },
        {
          headers: {
            Authorization: `Bearer ${authToken}`, // Include the token in the Authorization header
          },
        }
      );
    
      console.log("Password changed successfully:", response.data);
      navigate("/")
    } catch (error) {
      console.error("Change password failed:", error.message);
      throw error;
    }
    
  };
  const handleChangePassword = async () => {
    // Validation
    console.log(newPassword);
    
    if (newPassword.length < 6) {
      setSnackbarMessage('New password must be at least 6 characters long.');
      setSnackbarType('error');
      setOpenSnackbar(true);
      return;
    }

    if (newPassword !== confirmNewPassword) {
      setSnackbarMessage('Passwords do not match.');
      setSnackbarType('error');
      setOpenSnackbar(true);
      return;
    }

    try {
      console.log("dss");
      
      // Call the ChangePassword function from AuthContext
      await chnagePassword(oldPassword, newPassword);
      setSnackbarMessage('Password changed successfully!');
      setSnackbarType('success');
    } catch (error) {
      setSnackbarMessage('Failed to change password. Please try again.');
      setSnackbarType('error');
    } finally {
      setOpenSnackbar(true); // Show snackbar
    }
  };

  const handleCloseSnackbar = () => {
    setOpenSnackbar(false);
  };

  return (
    <div style={{ maxWidth: '400px', margin: 'auto', padding: '20px', backgroundColor: '#fff', borderRadius: '8px', boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)' }}>
      <h2 style={{ textAlign: 'center' }}>Change Password</h2>
      
      <TextField
        label="Old Password"
        type="password"
        fullWidth
        margin="normal"
        value={oldPassword}
        onChange={(e) => setOldPassword(e.target.value)}
        required
        variant="outlined"
      />

      <TextField
        label="New Password"
        type="password"
        fullWidth
        margin="normal"
        value={newPassword}
        onChange={(e) => setNewPassword(e.target.value)}
        required
        variant="outlined"
        error={newPassword.length > 0 && newPassword.length < 6}
        helperText={newPassword.length > 0 && newPassword.length < 6 ? 'Password must be at least 6 characters long' : ''}
      />

      <TextField
        label="Confirm New Password"
        type="password"
        fullWidth
        margin="normal"
        value={confirmNewPassword}
        onChange={(e) => setConfirmNewPassword(e.target.value)}
        required
        variant="outlined"
        error={confirmNewPassword !== '' && confirmNewPassword !== newPassword}
        helperText={confirmNewPassword !== '' && confirmNewPassword !== newPassword ? 'Passwords do not match' : ''}
      />

      <Button
        fullWidth
        variant="contained"
        color="primary"
        onClick={handleChangePassword}
        style={{ marginTop: '20px' }}
      >
        Change Password
      </Button>

      <Snackbar
        open={openSnackbar}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          onClose={handleCloseSnackbar}
          severity={snackbarType}
          sx={{ width: '100%' }}
        >
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </div>
  );
};

export default ChangePassword;
