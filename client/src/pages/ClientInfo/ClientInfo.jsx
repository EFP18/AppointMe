import React, { useState } from 'react';
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
  TextField,
  Grid,
  Stack,
} from '@mui/material';

export default function ClientInfo() {
  const vendorImage = stockImg;
  const vendorName = 'Vendor Name';
  const emailValidation = /.+@.+\..+/;
  const maxNotesLength = 500;

  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [notes, setNotes] = useState('');

  const handleEmailChange = event => {
    setEmail(event.target.value);
    setEmailError(!emailValidation.test(event.target.value));
  };

  const handleNotesChange = event => {
    if (event.target.value.length <= maxNotesLength) {
      setNotes(event.target.value);
    }
  };

  const handleSubmit = event => {
    event.preventDefault();
    // Perform additional validation here
    if (emailError) {
      alert('Please enter a valid email address');
    } else {
      // Submit the form
    }
  };

  return (
    <>
      <Header />
      <Grid container>
        <Grid item xs={12} lg={10} style={{ margin: '20px auto' }}>
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
            <Typography
              variant='h5'
              sx={{ marginLeft: '10px', fontWeight: 'bold', display: 'flex' }}
            >
              You're nearly done. Enter your details below.
            </Typography>

            <form onSubmit={handleSubmit}>
              <Stack direction='column' spacing={2} alignItems='center'>
                <Grid container spacing={2}>
                  <Grid item xs={6}>
                    <TextField
                      label='First Name'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      required
                    />
                  </Grid>
                  <Grid item xs={6}>
                    <TextField
                      label='Last Name'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      required
                    />
                  </Grid>
                </Grid>
                <TextField
                  label='Email'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  required
                  value={email}
                  onChange={handleEmailChange}
                  error={emailError}
                  helperText={emailError ? 'Invalid email address' : ''}
                />
                <TextField
                  label='Phone Number'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  required
                />
                <TextField
                  label='Address'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Your address'
                  required
                />
                <TextField
                  label={`Appointment notes (optional) (${notes.length}/${maxNotesLength})`}
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  placeholder='Appointment notes (optional)'
                  multiline
                  rows={4}
                  value={notes}
                  onChange={handleNotesChange}
                />
                <ThemeProvider theme={button}>
                  <Button type='submit' style={{ margin: '10px' }}>
                    Book Appointment
                  </Button>
                </ThemeProvider>
              </Stack>
            </form>
          </Card>
        </Grid>
      </Grid>
    </>
  );
}