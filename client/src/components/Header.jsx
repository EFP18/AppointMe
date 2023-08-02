import { useState } from 'react';
import { Link } from 'react-router-dom';
import { AppBar, Toolbar, Typography, Box, Button, Grid, Hidden } from '@mui/material';
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
          <Grid container alignItems="center">
            <Grid item xs={9} sm={10}>
              <Typography
                variant='h5'
                component='div'
                sx={{
                  flexGrow: 1,
                  marginTop: '10px',
                }}
              >
                <Hidden only="xs">
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
                </Hidden>
                <Hidden smUp>
                  <Link
                    to='/'
                    style={{
                      textDecoration: 'none',
                      float: 'left',
                      color: colors.primary,
                      fontFamily: 'League Spartan',
                      fontWeight: 'bolder',
                      fontSize: 30,
                      letterSpacing: '-2.5px',
                    }}
                  >
                    am.
                  </Link>
                </Hidden>
              </Typography>
            </Grid>
            <Grid item xs={3} sm={2} className='Header pb-4'>
              <div className='login-signup-button'>
                <ThemeProvider theme={button}>
                  <Button
                    variant='contained'
                    color='primary'
                    accessibilityLabel='signup/login button'
                    component={Link}
                    to='/login'
                    size="small"
                  >
                    Sign Up / Login
                  </Button>
                </ThemeProvider>
              </div>
            </Grid>
          </Grid>
        </Toolbar>
      </CustomAppBar>
    </Box>
  );
}
