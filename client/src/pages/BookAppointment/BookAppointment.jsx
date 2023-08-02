import * as React from 'react';
import Header from '../../components/Header';
import stockImg from '../VendorPage-ClientView/img/stock-photo.png';
import { colors } from '../../components/theme';
import button from '../../components/button';
import {
  Card,
  Button,
  Box,
  Typography,
  Divider,
  ThemeProvider,
  Grid,
} from '@mui/material';
import DatePicker from 'react-datepicker';
import 'react-datepicker/dist/react-datepicker.css';
import { isSameDay } from 'date-fns';
import './BookAppointment.css';

export default function BookAppointment() {
  // Temporary values for the vendor's image and name
  const vendorImage = stockImg;
  const vendorName = 'Vendor Name';

  const availableDates = [
    {
      date: new Date(2023, 7, 10),
      slots: ['10:00 AM', '11:00 AM', '12:00 PM'],
    },
    {
      date: new Date(2023, 7, 15),
      slots: ['10:00 AM', '11:00 AM', '12:00 PM', '1:00 PM'],
    },
    {
      date: new Date(2023, 7, 17),
      slots: ['11:00 AM', '1:00 PM', '2:00PM', '3:00PM'],
    },
    {
      date: new Date(2023, 7, 18),
      slots: ['1:00 PM', '2:00 PM', '3:00 PM', '4:00 PM'],
    },
    { date: new Date(2023, 7, 21), slots: ['10:00 AM', '1:00 PM'] },
  ];

  const [selectedDate, setSelectedDate] = React.useState(null);
  const [selectedTimeSlots, setSelectedTimeSlots] = React.useState([]);

  const handleDateChange = date => {
    setSelectedDate(date);
    const availableDate = availableDates.find(item =>
      isSameDay(item.date, date)
    );
    setSelectedTimeSlots(availableDate ? availableDate.slots : []);
  };

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12}  lg={10} style={{ margin: '20px auto' }}>
          <Card sx={{ backgroundColor: colors.white, padding: '20px' }}>
            <Box
              sx={{
                display: 'flex',
                alignItems: 'center',
                marginLeft: '10px',
              }}
            >
              <img
                src={stockImg}
                alt='Vendor'
                style={{ width: '50px', marginRight: '10px' }}
              />
              <Typography variant='h5' sx={{ fontWeight: 'bold' }}>
                {vendorName}
              </Typography>
            </Box>
            <Divider
              sx={{ backgroundColor: colors.primary, margin: '10px 0' }}
            />
            <div
              style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                margin: '20px auto',
                textAlign: 'center',
              }}
            >
              <div style={{ width: '300px' }}>
                <DatePicker
                  selected={selectedDate}
                  onChange={handleDateChange}
                  inline
                  highlightDates={availableDates.map(item => item.date)}
                  dayClassName={date => {
                    const availableDate = availableDates.some(item =>
                      isSameDay(item.date, date)
                    );
                    return availableDate
                      ? 'react-datepicker__day--available'
                      : '';
                  }}
                />
              </div>
            </div>
            {selectedTimeSlots.length > 0 && (
              <div style={{ textAlign: 'center' }}>
                <Typography variant='h6'>Available Time Slots:</Typography>
                <ThemeProvider theme={button}>
                  {selectedTimeSlots.map(timeSlot => (
                    <Button
                      key={timeSlot}
                      style={{ margin: '5px' }}
                      href='/client-info' 
                    >
                      {timeSlot}
                    </Button>
                  ))}
                </ThemeProvider>
              </div>
            )}
          </Card>
        </Grid>
      </Grid>
    </>
  );
}
