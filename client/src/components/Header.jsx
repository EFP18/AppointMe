// This is the header for the landing page and services pages
// It will be replaced by the navbar component when the user is logged in
import { useState } from 'react';
// Import the Link component for routing
import { Link } from 'react-router-dom';
import Button from '@mui/material/Button';
import * as React from 'react';
import '../../src/pages/LandingPage/LandingPage';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import SearchBox from '../components/SearchBox';
import services from '../data/services';

export default function Header() {
  const [selectedService, setSelectedService] = useState(null);

  // const handleServiceNavigation = () => {
  //   if (selectedService) {
  //     switch (selectedService.type) {
  //       case 'Music':
  //         return <MusicServicePage />;
  //       default:
  //         return null;
  //     }
  //   }
  // };
  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position='static'>
        <Toolbar>
          {/* logo or text appointme with link behind it to lead back to landing page */}
          <Typography
            variant='h5'
            component='div'
            sx={{ flexGrow: 1, display: { xs: 'none', sm: 'block' } }}
          >
            <Link to='/' style={{ textDecoration: 'none', float: 'left' }}>
              appointme.
            </Link>
          </Typography>
          <div className='Header pb-4'>
            <div className='login-signup-button'>
              {/* button leads to login page */}
              <Button
                variant='contained'
                color='primary'
                accessibilityLabel='signup/login button'
                // Use Link component instead of href
                component={Link}
                // URL to navigate when the button is clicked
                to='/login'
              >
                Sign Up / Login
              </Button>
            </div>
          </div>
          <div className='search-bar'>
            <SearchBox
              details={services}
              // Update the setSelectedService when a service is selected
              onSelect={(service) => {
                setSelectedService(service);
              }}
            />
          </div>
          {/* Render the selected service page */}
          {/* {handleServiceNavigation()} */}
        </Toolbar>
      </AppBar>
    </Box>
  );
}