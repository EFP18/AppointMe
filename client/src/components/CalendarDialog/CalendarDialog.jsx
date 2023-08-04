import React from 'react';
import { Dialog } from '@mui/material';

const CalendarDialog = ({ open, onClose }) => {
  return (
    <Dialog open={open} onClose={onClose}>
      {/* Add your calendar dialog content here */}
    </Dialog>
  );
};

export default CalendarDialog;
