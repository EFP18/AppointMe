import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button } from '@mui/material';
import * as React from 'react';
import '../../src/pages/LandingPage/LandingPage';
import { styled } from '@mui/system';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from './theme';
import button from './button';

const CustomAppBar = styled(AppBar)({
  backgroundColor: colors.black,
  height: '80px',
});

export default function Header() {
  return (
    <Box sx={{ flexGrow: 1 }}>
      <CustomAppBar position='static'>
        <Toolbar>
          <Typography
            variant='h5'
            component='div'
            sx={{
              flexGrow: 1,
              display: 'flex',
              marginTop: '10px',
              display: { xs: 'none', sm: 'block' },
            }}
          >
            <Link
              to='/'
              style={{
                textDecoration: 'none',
                float: 'left',
                color: colors.primary,
                fontFamily: 'League Spartan',
                fontWeight: 'bolder',
                fontSize: 50,
                letterSpacing: '-2.5px',
              }}
            >
              appointme.
            </Link>
          </Typography>
          <div className='Header pb-4'>
            <div className='login-signup-button'>
              <ThemeProvider theme={button}>
                <Button
                  variant='contained'
                  color='primary'
                  accessibilityLabel='signup/login button'
                  component={Link}
                  to='/login'
                >
                  Sign Up / Login
                </Button>
              </ThemeProvider>
            </div>
          </div>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
}
