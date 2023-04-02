import React, { useState } from 'react';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import Button from '@mui/material/Button';

const BorrowConfirmation = ({ book, handleBorrow }) => {
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
      <Button onClick={handleClickOpen}>Borrow</Button>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Proceed to borrow?</DialogTitle>
        <DialogContent>
          <div>You are about to borrow {book?.title} by {book?.author?.name}.</div>
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

export default BorrowConfirmation;
