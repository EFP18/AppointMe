import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import { Button, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import buttonTheme from '../button';
import { ThemeProvider } from '@mui/material/styles';
import './EventForm.css'

const EventForm = ({ onAddEvent, events }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    startTime: moment(),
    endTime: moment(),
  });

  const [selectedEvent, setSelectedEvent] = useState(null);

  function handleAddEvent() {
    const start = new Date(newEvent.startDate);
    start.setHours(newEvent.startTime.hour());
    start.setMinutes(newEvent.startTime.minute());

    const end = new Date(newEvent.startDate);
    end.setHours(newEvent.endTime.hour());
    end.setMinutes(newEvent.endTime.minute());

    onAddEvent({ ...newEvent, start, end });
    setNewEvent({
      title: '',
      startDate: '',
      startTime: moment(),
      endTime: moment(),
    });
  }

  const handleClose = () => {
    setSelectedEvent(null);
  }

  return (
    <div className='EventForm'>
      <DatePicker
        placeholderText='Date'
        selected={newEvent.startDate}
        onChange={date => setNewEvent({ ...newEvent, startDate: date })}
        dateFormat='MMMM d, yyyy'
      />
      <TimePicker
        placeholder='Start Time'
        value={newEvent.startTime}
        onChange={time => setNewEvent({ ...newEvent, startTime: time })}
        use12Hours
        minuteStep={15}
        showSecond={false}
        format='h:mm a'
        inputReadOnly
      />
      <TimePicker
        placeholder='End Time'
        value={newEvent.endTime}
        onChange={time => setNewEvent({ ...newEvent, endTime: time })}
        use12Hours
        minuteStep={15}
        showSecond={false}
        format='h:mm a'
        inputReadOnly
      />
      <ThemeProvider theme={buttonTheme}>
        <Button style={{ marginTop: '10px' }} onClick={handleAddEvent}>
          Add Event
        </Button>
      </ThemeProvider>

      {/* Event details dialog */}
      <Dialog
        open={selectedEvent !== null}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        <DialogTitle id="alert-dialog-title">
          {selectedEvent ? selectedEvent.title : ''}
        </DialogTitle>
        <DialogContent>
          Start: {selectedEvent ? selectedEvent.start.toString() : ''}
          End: {selectedEvent ? selectedEvent.end.toString() : ''}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
          <Button color="primary" autoFocus>
            Edit
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default EventForm;
