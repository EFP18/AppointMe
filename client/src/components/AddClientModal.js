import React, { useState } from 'react';
import { Modal, TextField, Box, Button } from '@mui/material';
import button from './button';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from './theme';

export default function AddClientModal({ addClient }) {
  const [open, setOpen] = useState(false);
  const [newClient, setNewClient] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: '',
  });

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const handleChange = e => {
    setNewClient({
      ...newClient,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = () => {
    addClient(newClient);
    handleClose();
  };

  const body = (
    <Box
      sx={{
        backgroundColor: colors.black,
        color: colors.primary,
        padding: 3,
        borderRadius: 1,
        m: 2,
        width: '75vw',
        mx: 'auto',
        borderRadius: '10px',
      }}
    >
      <h2 id='modal-title' style={{ textAlign: 'center' }}>
        Add New Client
      </h2>
      <Box
        component='form'
        sx={{
          textAlign: 'center',
          '& .MuiTextField-root': { m: 1, width: '60vw' },
        }}
        noValidate
        autoComplete='off'
        onSubmit={(e) => { 
          e.preventDefault(); 
          handleSubmit(); 
        }}
      >
        <TextField
          name='firstName'
          label='First Name'
          variant='outlined'
          onChange={handleChange}
          InputLabelProps={{ style: { color: colors.primary } }}
          InputProps={{
            style: { color: colors.primary },
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
              },
            },
          }}
        />
        <TextField
          name='lastName'
          label='Last Name'
          variant='outlined'
          onChange={handleChange}
          InputLabelProps={{ style: { color: colors.primary } }}
          InputProps={{
            style: { color: colors.primary },
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
              },
            },
          }}
        />
        <TextField
          type='email'
          name='email'
          label='Email'
          variant='outlined'
          onChange={handleChange}
          InputLabelProps={{ style: { color: colors.primary } }}
          InputProps={{
            style: { color: colors.primary },
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
              },
            },
          }}
        />
        <TextField
          name='phone'
          label='Phone Number'
          variant='outlined'
          onChange={handleChange}
          InputLabelProps={{ style: { color: colors.primary } }}
          InputProps={{
            style: { color: colors.primary },
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
              },
            },
          }}
        />
        <TextField
          name='address'
          label='Address'
          variant='outlined'
          onChange={handleChange}
          InputLabelProps={{ style: { color: colors.primary } }}
          InputProps={{
            style: { color: colors.primary },
            sx: {
              '& .MuiOutlinedInput-notchedOutline': {
                borderColor: colors.primary,
              },
            },
          }}
        />
        <Box
          sx={{
            display: 'block',
            marginTop: 2,
            marginBottom: 2,
          }}
        >
          <ThemeProvider theme={button}>
            <Button type='submit' variant='contained' >
              <Box fontWeight='fontWeightBold'>ADD NEW CLIENT</Box>
            </Button>
          </ThemeProvider>
        </Box>
      </Box>
    </Box>
  );

  return (
    <>
      <ThemeProvider theme={button}>
        <Button
          type='submit'
          variant='contained'
          onClick={handleOpen}
          sx={{ marginBottom: 4 }}
        >
          <Box fontWeight='fontWeightBold'>ADD NEW CLIENT</Box>
        </Button>
      </ThemeProvider>

      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby='modal-modal-title'
        aria-describedby='modal-modal-description'
      >
        {body}
      </Modal>
    </>
  );
}
