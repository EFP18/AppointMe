import React, { useState } from 'react';
import CalendarComponent from '../../components/Calendar/Calendar';
import Navbar from '../../components/Navbar/Navbar';
import { Card, Box, Container, Grid } from '@mui/material';
import { colors } from '../../components/theme';
import EventForm from '../../components/EventForm/EventForm';
import './CalendarPage.css';
import Page from '../../components/Page';
import moment from 'moment';

const CalendarPage = () => {
  const [allEvents, setAllEvents] = useState([
    {
      start: moment("2023-03-18T10:00:00").toDate(),
      end: moment("2023-03-18T11:00:00").toDate(),
      title: "MRI Registration",
    },
    {
      start: moment("2023-03-18T14:00:00").toDate(),
      end: moment("2023-03-18T15:30:00").toDate(),
      title: "ENT Appointment",
    },
  ]);

  const handleAddEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  const onEditEvent = (e) => {
    console.log(e);
    console.log('calendar click!!');
    setSelectedEvent(e);
  };

  return (
    <Page title={'My Calendar - AppointMe'} className='calendar-page'>
      <div sx={{ display: 'flex' }}>
        <Navbar />
        <Card >
          <Box
            sx={{
              marginLeft: '100px',
              flexGrow: 1,
              backgroundColor: colors.white,
            }}
          >
            <h1>Calendar</h1>
            <h2>Add Availability</h2>
            <EventForm
              onAddEvent={handleAddEvent}
              allEvents={allEvents}
              setAllEvents={setAllEvents}
              selectedEvent={selectedEvent}
              setSelectedEvent={setSelectedEvent}
            />

            <CalendarComponent events={allEvents} onEditEvent={onEditEvent} />
          </Box>
        </Card>
      </div>
    </Page>
  );
};

export default CalendarPage;
