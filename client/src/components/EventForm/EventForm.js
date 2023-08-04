import React, { useState, useEffect } from 'react';
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
  Grid,
  Container,
} from '@mui/material';
import buttonTheme from '../button';
import { ThemeProvider } from '@mui/material/styles';
import './EventForm.css';
import CalendarComponent from '../Calendar/Calendar';
import { colors } from '../theme';
import { v4 as uuidv4 } from 'uuid'

const EventForm = ({
  onAddEvent,
  allEvents,
  setAllEvents,
  selectedEvent,
  setSelectedEvent,
}) => {
  const [newEvent, setNewEvent] = useState({
    title: '',
    startDate: '',
    startTime: moment(),
    endTime: moment(),
  });

  // const [editingMode, setEditingMode] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [addEventError, setAddEventError] = useState(null)

  function handleAddEvent() {
    const start = new Date(newEvent.startDate);
    start.setHours(newEvent.startTime.hour());
    start.setMinutes(newEvent.startTime.minute());

    const end = new Date(newEvent.startDate);
    end.setHours(newEvent.endTime.hour());
    end.setMinutes(newEvent.endTime.minute());

    // id needed to easily identify the used event
    const newEventWithId = { ...newEvent, id: uuidv4(), start, end };

    // adds an error if the created event ends and starts at the same
    if (newEventWithId.start.getTime() === newEventWithId.end.getTime()) {
      setAddEventError('Events cannot start and end at the same time!')
      return;
    } else if (newEventWithId.start.getTime() > newEventWithId.end.getTime()) { //adds an error if the created event ends before it starts
      setAddEventError('Events cannot end before they start!')
      return;
    } else {
      setAddEventError(null)
    }

    onAddEvent(newEventWithId);
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

  // function handleEditEvent(event) {
  //   setSelectedEvent(event);
  //   setEditingEvent(event);
  //   if (onEditEvent) onEditEvent(event);
  // }

  useEffect(() => {
    if (selectedEvent) {
      setEditingEvent(selectedEvent);
    }
  }, [selectedEvent]);

  const handleClose = () => {
    setSelectedEvent(null); // Update this function to use the prop
  };

  function handleDeleteEvent() {
    if (!editingEvent) return;

    const updatedEvents = allEvents.filter((event) => event.id !== editingEvent.id);
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
          PaperProps={{
            style: { backgroundColor: colors.black },
          }}
        >
          <DialogTitle style={{ fontSize: '18px' }}>
            {editingEvent ? editingEvent.title : ''}
          </DialogTitle>
          <DialogContent
            style={{ fontSize: '18px', lineHeight: '2', color: colors.primary }}
          >
            Start:{' '}
            {editingEvent
              ? moment(editingEvent.start).format('ddd MMM D YYYY h:mma')
              : ''}
            <br />
            End:{' '}
            {editingEvent
              ? moment(editingEvent.end).format('ddd MMM D YYYY h:mma')
              : ''}
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() => setEditingEvent(null)}
              className='dialog-button'
            >
              Close
            </Button>
            {/* <Button className="dialog-button">
    Edit
  </Button> */}
            <Button onClick={event => handleDeleteEvent(event)} className='dialog-button'>
              Delete
            </Button>
            <Button
              onClick={handleSaveEdit}
              className='dialog-button'
              autoFocus
            >
              Save
            </Button>
          </DialogActions>
        </Dialog>
      </div>
      <h3 className='error'>{addEventError}</h3>
    </>
  );
};

export default EventForm;
