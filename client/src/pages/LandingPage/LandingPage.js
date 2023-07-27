import { React, useState } from 'react';
import { Button, TextField } from '@mui/material';
import './LandingPage.css';
import SearchBox from '../../components/SearchBox';
import Page from '../../components/Page';
import appointme from '../../images/appointme-lowercase-small.png';

function LandingPage() {
  // const [inputText, setInputText] = useState('');

  // const handleSearch = (e) => {
  //   const lowerCase = e.target.value.toLowerCase();
  //   //convert input text to lower case
  //   setInputText(lowerCase);
  // };
  // const handleSearch = (event) => {
  //   // Handle search logic here
  // };

  // const handleLoginSignup = () => {
  //   // Handle login/signup logic here
  // };

  return (
    <Page title={'AppointMe'} className='landing-page'>
      <img className='' src={appointme} alt='appointme-text' style={{}} />

      <div className='login-signup-button'>
        {/* button leads to signup page */}
        <Button
          variant='contained'
          color='primary'
          // onClick={handleLoginSignup}
          accessibilityLabel='signup/login button'
          href='/signup'
        >
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
      <div>space for image</div>
      <div>
        Text about us, business model, link to contact us page? What we are, who
        we are, services we offer, description of app.
      </div>
    </Page>
  );
}

export default LandingPage;
