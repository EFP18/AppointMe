import React from 'react';
import { Button, TextField } from '@mui/material';
import './LandingPage.css';
import SearchBox from '../../components/SearchBox';
import Page from '../../components/Page';

function LandingPage() {
  const handleSearch = (event) => {
    // Handle search logic here
  };

  const handleLoginSignup = () => {
    // Handle login/signup logic here
  };

  return (
    <Page title={'AppointMe'} className='landing-page'>
      {/* <div className='landing-page'> */}
      <h1>AppointMe</h1>

      <div className='login-signup-button'>
        <Button variant='contained' color='primary' onClick={handleLoginSignup}>
          Sign Up / Login
        </Button>
      </div>

      <div className='search-bar'>
        <SearchBox />
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
      {/* </div> */}
    </Page>
  );
}

export default LandingPage;
