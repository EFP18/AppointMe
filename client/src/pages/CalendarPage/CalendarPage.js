import React, { useState } from "react";
import Calendar from "../../components/Calendar/Calendar";
import Navbar from "../../components/Navbar";
// import EventForm from "../../components/EventForm/EventForm";
import "./CalendarPage.css";

const CalendarPage = () => {
  const [allEvents, setAllEvents] = useState([
    {
      title: "Meeting",
      allDay: true,
      start: new Date(2023, 6, 1),
      end: new Date(2023, 6, 1),
    },
    {
      title: "Vacation",
      allDay: true,
      start: new Date(2023, 6, 13),
      end: new Date(2023, 6, 17),
    },

  ]);

  const handleAddEvent = newEvent => {
    setAllEvents([...allEvents, newEvent]);
  };

  return (
    <div className="MainPage">
        <Navbar />
      <h1>Calendar</h1>
      {/* <h2>Add New Event</h2>
      <EventForm onAddEvent={handleAddEvent} /> */}
      <Calendar events={allEvents} />
    </div>
  );
};

export default CalendarPage;
