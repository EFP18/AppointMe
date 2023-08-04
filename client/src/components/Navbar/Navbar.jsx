import React, { useState } from 'react';
import { Typography, Box } from '@mui/material';
import { colors } from '../theme';
import calendarIcon from '../../assets/img/calendar.png';
import clientsIcon from '../../assets/img/clients.png';
import editIcon from '../../assets/img/edit.png';
import logoutIcon from '../../assets/img/logout.png';
import viewIcon from '../../assets/img/view.png';
import authServiceInstance from '../../utils/auth';
import { CustomIconButton } from './NavbarFunction';

function Navbar() {
  const logoutClick = (event) => {
    event.preventDefault();
    console.log('hit');
    authServiceInstance.logout();
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = (hover) => (event) => {
    setIsHovered(hover);
  };

  return (
    <div>
      <Box
        sx={{
          position: 'fixed',
          top: 0,
          left: 0,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '97vh',
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
          style={{
            color: colors.primary,
            marginBottom: '20px',
            fontFamily: 'League Spartan',
            fontWeight: 'bolder',
            fontSize: 45,
            letterSpacing: '-2.5px',
          }}
        >
          {isHovered ? 'appointme.' : 'am.'}
        </Typography>
        <CustomIconButton
          icon={editIcon}
          altText='edit'
          linkPath='/vendorprofile'
          linkText='Edit Profile'
          isHovered={isHovered}
        />
        <CustomIconButton
          icon={viewIcon}
          altText='view'
          linkPath='/profileview'
          linkText='Profile View'
          isHovered={isHovered}
        />
        <CustomIconButton
          icon={calendarIcon}
          altText='calendar'
          linkPath='/calendarpage'
          linkText='Calendar'
          isHovered={isHovered}
        />
        <CustomIconButton
          icon={clientsIcon}
          altText='clients'
          linkPath='/clientDb'
          linkText='Clients'
          isHovered={isHovered}
        />
        <Box sx={{ mt: 'auto' }}>
          <CustomIconButton
            icon={logoutIcon}
            altText='logout'
            // once logged out, redirect to landing page
            onClick={logoutClick}
            linkText='Sign Out'
            isHovered={isHovered}
          />
        </Box>
      </Box>
    </div>
  );
}

export default Navbar;
