import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';
import { Typography } from '@mui/material';

const ReturnConfirmation = ({ book, handleReturn }) => {
  const [open, setOpen] = useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleConfirm = (event) => {
    handleReturn(event);
    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <>
      <Button onClick={handleClickOpen} style={{backgroundColor:"#007FFF", color: "white"}}>Return</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Proceed to return?</DialogTitle>
        <DialogContent>
          <Typography>
            You are about to return {book?.title} by {book?.author?.name}.
          </Typography>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCancel} color="inherit">
            Cancel
          </Button>
          <Button onClick={handleConfirm} color="primary" autoFocus>
            Return
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default ReturnConfirmation;
