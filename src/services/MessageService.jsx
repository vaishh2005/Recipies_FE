import React from 'react';
import { Snackbar, Alert } from '@mui/material';

const MessageService = ({ message, type, open, handleClose }) => {
  return (
    <Snackbar
      open={open}
      autoHideDuration={5000} // Automatically closes after 5 seconds
      onClose={handleClose}
      anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
    >
      <Alert
        onClose={handleClose}
        severity={type} // 'success' or 'error'
        sx={{
          width: '100%',
          backgroundColor: type === 'success' ? 'rgba(0, 128, 0, 0.3)': 'rgba(255, 0, 0, 0.3)',
          color: 'white',
          border: '1px solid white', // White border
          borderRadius: '8px', // Rounded corners
        }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
};

export default MessageService;
