import React, { useState } from 'react';
import { Button, Drawer, Typography, Box, IconButton } from '@mui/material';
import { Link } from 'react-router-dom';
import { colors } from './theme';
import calendarIcon from '../assets/img/calendar.png';
import clientsIcon from '../assets/img/clients.png';
import editIcon from '../assets/img/edit.png';
import logoutIcon from '../assets/img/logout.png';
import viewIcon from '../assets/img/view.png';
import Auth from '../utils/auth';

function Navbar() {
  const logout = (event) => {
    event.preventDefault();
    Auth.logout();
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hover) => (event) => {
    setIsHovered(hover);
  };

  return (
    <div>
      {/* {Auth.loggedIn() ? (
        <> */}
          <Box
            sx={{
              position: 'fixed',
              top: 0,
              left: 0,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              height: '100vh',
              width: isHovered ? '200px' : '50px',
              padding: '20px',
              backgroundColor: colors.black,
              transition: 'width 0.3s',
              zIndex: 1,
            }}
            onMouseEnter={handleHover(true)}
            onMouseLeave={handleHover(false)}
          >
            <Typography
              variant='h4'
              style={{ color: colors.primary, marginBottom: '20px' }}
            >
              {isHovered ? 'appointme.' : 'am.'}
            </Typography>
            <IconButton style={{ pointerEvents: 'none' }}>
              <img
                src={editIcon}
                alt='edit'
                style={{ width: '24px', height: '24px', pointerEvents: 'auto' }}
              />
              {isHovered && (
                <Link
                  to='/vendorprofile'
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    marginLeft: '10px',
                    pointerEvents: 'auto',
                  }}
                >
                  Edit Profile
                </Link>
              )}
            </IconButton>
            <IconButton style={{ pointerEvents: 'none' }}>
              <img
                src={viewIcon}
                alt='view'
                style={{ width: '24px', height: '24px', pointerEvents: 'auto' }}
              />
              {isHovered && (
                <Link
                  to='/profileview'
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    marginLeft: '10px',
                    pointerEvents: 'auto',
                  }}
                >
                  Profile View
                </Link>
              )}
            </IconButton>
            <IconButton style={{ pointerEvents: 'none' }}>
              <img
                src={calendarIcon}
                alt='calendar'
                style={{ width: '24px', height: '24px', pointerEvents: 'auto' }}
              />
              {isHovered && (
                <Link
                  to='/calendarpage'
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    marginLeft: '10px',
                    pointerEvents: 'auto',
                  }}
                >
                  Calendar
                </Link>
              )}
            </IconButton>
            <IconButton style={{ pointerEvents: 'none' }}>
              <img
                src={clientsIcon}
                alt='clients'
                style={{ width: '24px', height: '24px', pointerEvents: 'auto' }}
              />
              {isHovered && (
                <Link
                  to='/clientDb'
                  style={{
                    color: colors.primary,
                    textDecoration: 'none',
                    marginLeft: '10px',
                    pointerEvents: 'auto',
                  }}
                >
                  Client's
                </Link>
              )}
            </IconButton>
            <Box sx={{ mt: 'auto' }}>
              <IconButton style={{ pointerEvents: 'none' }}>
                <img
                  src={logoutIcon}
                  alt='logout'
                  style={{
                    width: '24px',
                    height: '24px',
                    marginRight: '10px',
                    pointerEvents: 'auto',
                  }}
                />
                {isHovered && (
                  <Typography
                    style={{
                      pointerEvents: 'auto',
                      color: colors.primary,
                      textDecoration: 'none',
                      marginLeft: '10px',
                    }}
                  >
                    Sign Out
                  </Typography>
                )}
              </IconButton>
            </Box>
          </Box>
        {/* </>
      ) : (
        <></>
      )} */}
    </div>
  );
}

export default Navbar;
