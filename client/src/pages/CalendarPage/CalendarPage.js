import React, { useState } from 'react';
import Calendar from '../../components/Calendar/Calendar';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/material';
import EventForm from "../../components/EventForm/EventForm";
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

  const handleAddEvent = (newEvent) => {
    setAllEvents([...allEvents, newEvent]);
  };

  return (
    <Page title={'My Calendar - AppointMe'} className='landing-page'>
      <div sx={{ display: 'flex' }}>
        <Navbar />
        <Box sx={{ marginLeft: '100px', flexGrow: 1 }}>
          <h1>Calendar</h1>
          <h2>Add Availability</h2>
      <EventForm onAddEvent={handleAddEvent} />
          <Calendar events={allEvents} />
        </Box>
      </div>
    </Page>
  );
};

export default CalendarPage;

