import React, { useState } from "react";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import "./EventForm.css";

const EventForm = ({ onAddEvent }) => {
  const [newEvent, setNewEvent] = useState({ title: "", start: "", end: "" });

  function handleAddEvent() {
    onAddEvent(newEvent);
    setNewEvent({ title: "", start: "", end: "" });
  }

  return (
    <div className="EventForm">
      <input
        type="text"
        placeholder="Add Title"
        style={{ width: "20%", marginRight: "10px" }}
        value={newEvent.title}
        onChange={e => setNewEvent({ ...newEvent, title: e.target.value })}
      />
      <DatePicker
        placeholderText="Start Date"
        style={{ marginRight: "10px" }}
        selected={newEvent.start}
        onChange={start => setNewEvent({ ...newEvent, start })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <DatePicker
        placeholderText="End Date"
        selected={newEvent.end}
        onChange={end => setNewEvent({ ...newEvent, end })}
        showTimeSelect
        timeFormat="HH:mm"
        timeIntervals={5}
        dateFormat="MMMM d, yyyy h:mm aa"
      />
      <button style={{ marginTop: "10px" }} onClick={handleAddEvent}>
        Add Event
      </button>
    </div>
  );
};

export default EventForm;
