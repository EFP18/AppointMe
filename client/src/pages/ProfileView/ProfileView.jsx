import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import {
  Button,
  Box,
  Checkbox,
  Typography,
  Divider,
  Card,
  Fab,
} from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import { colors } from '../../components/theme';
import { useStyles } from './profileViewStyles'
import button from '../../components/button';
import Navbar from '../../components/Navbar/Navbar';
import youtubeLogo from './img/youtube2.png';
import facebookLogo from './img/facebook2.png';
import instagramLogo from './img/instagram2.png';
import linkedInLogo from './img/linkedin2.png';
import tiktokLogo from './img/tik-tok2.png';
import emailLogo from './img/email2.png';
import stockImg from './img/stock-photo.png';
import stockBackgroundImg from './img/bgimg.png';
import Page from '../../components/Page';
import { GET_VENDOR, GET_BUSINESS } from '../../utils/queries';
import { useQuery } from '@apollo/client';
// for testing
// import businessData from './vendorSeeds.json';


function ProfileView() {
  const classes = useStyles();

  // no need to define variables because id is specified with context on resolvers
  const { loading, data } = useQuery(GET_BUSINESS);
  const businessData = data?.business || {};

  const [checkedService, setCheckedService] = useState(null);

  return (
    // Needs to take the variable of the id from GET_VENDOR, to only populate the vendor page we are logged in as
    <Page title={'My Profile - AppointMe'} className='landing-page'>
      
        <Navbar />
        <Card sx={{ backgroundColor: colors.grey, padding: '20px' }}>
        {/* {businessData.map((business) => ( */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
        <Box className={classes.profile}>
          <Box className={classes.header}>
            <img
              className={classes.bgImage}
              src={businessData.logo ? businessData.logo : stockBackgroundImg}
              alt='logo'
            />
            <Box className={classes.profileInfo}>
              <img
                className={classes.profileImage}
                src={businessData.image ? businessData.image : stockImg}
                alt='Profile'
              />
              <Box
                sx={{
                  display: 'flex',
                  justifyContent: 'space-between',
                  width: '100%',
                }}
              >
                <Box>
                  <Typography variant='h4' className={classes.name}>
                    {businessData.name}
                  </Typography>
                  <Typography variant='body1' className={classes.location}>
                    {businessData.firstName}
                  </Typography>
                </Box>
                <Box>
                  <ThemeProvider theme={button}>
                    <Button
                      href='/vendorprofile'
                      variant='contained'
                      style={{ marginRight: '40px' }}
                    >
                      ✎ Edit Profile
                    </Button>
                  </ThemeProvider>
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography className={classes.description}>
            {businessData.description}
          </Typography>

          <Divider
            style={{ margin: '2% 10% 4%', backgroundColor: colors.primary }}
          />

          <h2>Services</h2>
          {/* check if businessData.services is an array before mapping over it */}
          {Array.isArray(businessData.services) &&
          businessData.services.length > 0 ? (
            businessData.services.map((service, index) => (
              <Box key={index} className={classes.service}>
                <Checkbox
                  value='remember'
                  sx={{
                    color: colors.primary,
                    '&.Mui-checked': { color: colors.primary },
                  }}
                  checked={checkedService === index}
                  onChange={() => setCheckedService(index)}
                />
                <Typography className={classes.serviceName}>
                  {service.name}
                </Typography>
                <Typography>${service.price}</Typography>
              </Box>
            ))
          ) : (
            <p>No services listed.</p>
          )}

          {/* <h2>Availability</h2> */}
          {/* Render availability based on its structure */}
          {businessData.facebook && (
            <Link
              to={businessData.facebook}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className={classes.socialIcon}
                src={facebookLogo}
                alt='Facebook'
              />
            </Link>
          )}
          {businessData.youTube && (
            <Link
              to={businessData.youTube}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className={classes.socialIcon}
                src={youtubeLogo}
                alt='YouTube'
              />
            </Link>
          )}
          {businessData.instagram && (
            <Link
              to={businessData.instagram}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className={classes.socialIcon}
                src={instagramLogo}
                alt='Instagram'
              />
            </Link>
          )}
          {businessData.linkedIn && (
            <Link
              to={businessData.linkedIn}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className={classes.socialIcon}
                src={linkedInLogo}
                alt='LinkedIn'
              />
            </Link>
          )}
          {businessData.tikTok && (
            <Link
              to={businessData.tikTok}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img
                className={classes.socialIcon}
                src={tiktokLogo}
                alt='TikTok'
              />
            </Link>
          )}
          {businessData.email && (
            <Link
              to={`mailto:${businessData.email}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img className={classes.socialIcon} src={emailLogo} alt='Email' />
            </Link>
          )}
        </Box>
        </Box>
        {/* ))} */}
        </Card>
    </Page>
  );
}

export default ProfileView;