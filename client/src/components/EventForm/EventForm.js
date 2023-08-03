import React, { useState } from 'react';
import DatePicker from 'react-datepicker';
import TimePicker from 'rc-time-picker';
import 'react-datepicker/dist/react-datepicker.css';
import 'rc-time-picker/assets/index.css';
import moment from 'moment';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
} from '@mui/material';
import buttonTheme from '../button';
import { ThemeProvider } from '@mui/material/styles';
import './EventForm.css';
import CalendarComponent from '../Calendar/Calendar';
import { colors } from '../theme';

const EventForm = ({ onAddEvent, allEvents, setAllEvents, onEditEvent }) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    startTime: moment(),
    endTime: moment(),
  });

  const [selectedEvent, setSelectedEvent] = useState(null);
  const [editingEvent, setEditingEvent] = useState(null);

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

  function handleSaveEdit() {
    const updatedEvents = allEvents.map(event =>
      event === selectedEvent ? editingEvent : event
    );
    setAllEvents(updatedEvents);
    setEditingEvent(null);
  }
  
  function handleEditEvent(event) {
    setSelectedEvent(event);
    setEditingEvent(event);
    if (onEditEvent) onEditEvent(event);
  }

  const handleClose = () => {
    setSelectedEvent(null);
  };

  function handleDeleteEvent() {
    const updatedEvents = allEvents.filter(event => event !== editingEvent);
    setAllEvents(updatedEvents);
    setEditingEvent(null);
  }

  return (
    <>
      {/* <CalendarComponent events={allEvents} onEditEvent={onEditEvent} /> */}

      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <DatePicker
          style={{ width: '150px', margin: '0 10px' }}
          placeholderText='Date'
          selected={newEvent.startDate}
          onChange={date => setNewEvent({ ...newEvent, startDate: date })}
          dateFormat='MMMM d, yyyy'
        />
        <TimePicker
          style={{ width: '150px', margin: '0 5px' }}
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
          style={{ width: '150px', margin: '0 5px' }}
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
          <Button style={{ marginTop: 0 }} onClick={handleAddEvent}>
            Add Event
          </Button>
        </ThemeProvider>

        <Dialog
          open={editingEvent !== null}
          onClose={() => setEditingEvent(null)}
        >
          <DialogTitle>{editingEvent ? editingEvent.title : ''}</DialogTitle>
          <DialogContent>
            <TextField
              label='Title'
              value={editingEvent ? editingEvent.title : ''}
              onChange={e =>
                setEditingEvent({ ...editingEvent, title: e.target.value })
              }
            />
            Start: {editingEvent ? editingEvent.start.toString() : ''}
            End: {editingEvent ? editingEvent.end.toString() : ''}
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setEditingEvent(null)}>Close</Button>
            <Button onClick={handleDeleteEvent} color='secondary'>
              Delete
            </Button>
            <Button onClick={handleSaveEdit} color='primary' autoFocus>
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
};

export default EventForm;
