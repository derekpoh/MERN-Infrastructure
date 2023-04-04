import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const ReminderConfirmation = ({ book, handleReminder }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    handleBorrow(event);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
            <Button
            component={Link}
            to={`/books/${book._id}`}
            color="primary"
            variant="contained"
            sx={{ marginTop: 7 }}
            onClick={handleReminder}
          >
            Set Reminder
          </Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Proceed to set reminder?</DialogTitle>
        <DialogContent>
            <Typography>
                You are about to borrow "{book?.title}" by {book?.author?.name}.
            </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Borrow
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReminderConfirmation;
