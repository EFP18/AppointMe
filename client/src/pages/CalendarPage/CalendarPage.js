import React, { useState } from 'react';
import CalendarComponent from '../../components/Calendar/Calendar';
import Navbar from '../../components/Navbar/Navbar';
import { Card, Box, Container, Grid } from '@mui/material';
import { colors } from '../../components/theme'
import EventForm from '../../components/EventForm/EventForm';
import './CalendarPage.css';
import Page from '../../components/Page';

const CalendarPage = () => {
  const [allEvents, setAllEvents] = useState([
    {
      title: 'Meeting',
      allDay: true,
      start: new Date(2023, 6, 1),
      end: new Date(2023, 6, 1),
    },
    {
      title: 'Vacation',
      allDay: true,
      start: new Date(2023, 6, 13),
      end: new Date(2023, 6, 17),
    },
  ]);

  const handleAddEvent = newEvent => {
    setAllEvents([...allEvents, newEvent]);
  };

  const [selectedEvent, setSelectedEvent] = useState(null);

  const onEditEvent = e => {
    console.log(e);
    console.log('calendar click!!');
    setSelectedEvent(e);
  };

  return (
    <Page title={'My Calendar - AppointMe'} className='calendar-page'>
      <div sx={{ display: 'flex' }}>
        <Navbar />
        <Card>
          <Box sx={{ marginLeft: '100px', flexGrow: 1, backgroundColor: colors.white }}>
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
