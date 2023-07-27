import React from 'react';
import { Button, TextField } from '@mui/material';
import './LandingPage.css';
import SearchBox from '../../components/SearchBox';

function LandingPage() {
  const handleSearch = (event) => {
    // Handle search logic here
  };

  const handleLoginSignup = () => {
    // Handle login/signup logic here
  };

  return (
    <div className='landing-page'>
      <h1>AppointMe</h1>

      <div className='login-signup-button'>
        <Button variant='contained' color='primary' onClick={handleLoginSignup}>
          Sign Up / Login
        </Button>
      </div>

      <div className='search-bar'>
        <SearchBox/>
        {/* <TextField
          label='Search vendors'
          variant='outlined'
          fullWidth
          onKeyPress={(event) => {
            if (event.key === 'Enter') {
              handleSearch(event);
            }
          }}
        /> */}
      </div>
    </div>
  );
}

export default LandingPage;
