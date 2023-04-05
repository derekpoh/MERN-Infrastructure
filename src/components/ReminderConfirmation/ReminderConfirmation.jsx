import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography, Alert, Container } from '@mui/material';


const ReminderConfirmation = ({ book, handleReminder }) => {
  const [open, setOpen] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    handleReminder(event);
    setShowAlert(true);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  const handleAlertClose = () => {
    setShowAlert(false);
  }

  return (
    <>
      <Button
        color="primary"
        variant="contained"
        onClick={handleClickOpen}
        size="large"
      >
        Set Reminder
      </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Proceed to set reminder?</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to set a reminder for "{book?.title}".
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Set Reminder
          </Button>
        </DialogActions>
      </Dialog>
      <Container sx={{ position: "absolute", bottom: "2rem", textAlign: "center", width: "18rem" }}>
        {showAlert && (
          <Alert severity="success" onClose={handleAlertClose}>
            Reminder set successfully!
          </Alert>
        )}
      </Container>
    </>
  );
};

export default ReminderConfirmation;
