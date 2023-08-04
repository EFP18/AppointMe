import { Calendar, dateFnsLocalizer } from 'react-big-calendar';
import { Container } from '@mui/material';

import format from 'date-fns/format';
import parse from 'date-fns/parse';
import startOfWeek from 'date-fns/startOfWeek';
import getDay from 'date-fns/getDay';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import './Calendar.css';

const locales = {
  'en-US': require('date-fns/locale/en-US'),
};

const localizer = dateFnsLocalizer({
  format,
  parse,
  startOfWeek,
  getDay,
  locales,
});

const CalendarComponent = ({ events, onEditEvent }) => {
  return (
    <Calendar
      localizer={localizer}
      events={events}
      startAccessor='start'
      endAccessor='end'
      style={{ height: '75vh', margin: '50px' }}
      onSelectEvent={onEditEvent}
      views={{
        month: true,
        week: true,
        day: true,
      }}
    />
  );
};

export default CalendarComponent;
