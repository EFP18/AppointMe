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
import { ThemeProvider } from '@mui/material/styles';
import { makeStyles } from '@mui/styles';
import Page from '../../components/Page';
import Header from '../../components/Header';
import { colors } from '../../components/theme';
import { useStyles } from '../../components/clientViewStyles'
import button from '../../components/button';
import youtubeLogo from './img/youtube2.png';
import facebookLogo from './img/facebook2.png';
import instagramLogo from './img/instagram2.png';
import linkedInLogo from './img/linkedin2.png';
import tiktokLogo from './img/tik-tok2.png';
import emailLogo from './img/email2.png';
import stockImg from './img/stock-photo.png';
import stockBackgroundImg from './img/bgimg.png';
import phoneIcon from './img/phone.png';
import vendorData from './vendorSeeds.json';
// import { GET_VENDOR } from '../../utils/queries';
// import { useQuery } from '@apollo/client';
// testing



function ClientView(props) {
  const classes = useStyles();

  // const {loading, data} = useQuery(GET_VENDOR);
  // const vendorData = data?.vendor || {};

  const [checkedService, setCheckedService] = useState(null);

  return (
    // dynamically create vendor or business name
    <Page title={'Vendor Profile - AppointMe'}>
      <Header />
      <Card sx={{ backgroundColor: colors.grey, padding: '20px' }}>
        {vendorData.map(vendor => (
          <Box
            sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}
          >
            <Box className={classes.profile}>
              <Box className={classes.header}>
                <img
                  className={classes.bgImage}
                  src={vendor.logo ? vendor.logo : stockBackgroundImg}
                  alt='Background'
                />
                <Box className={classes.profileInfo}>
                  <img
                    className={classes.profileImage}
                    src={vendor.image ? vendor.image : stockImg}
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
                      <Typography variant='h4' sx={{ fontSize: { xs: '18px', sm: '20px', md: '24px' } }}>
                        {vendor.name}
                      </Typography>
                      <Typography variant='body1' className={classes.location}>
                        {vendor.firstName}
                      </Typography>
                    </Box>
                  </Box>
                </Box>
              </Box>

              <Typography className={classes.description}>
                {vendor.description}
              </Typography>

              <Divider
                style={{ margin: '2% 10% 4%', backgroundColor: colors.primary }}
              />

              {/* need to make it fixed while scrolling */}
              {vendor.business.phone && (
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'flex-end',
                    paddingRight: '20px',
                    position: 'fixed',
                  }}
                >
                  <Fab color='#1ABC9C'>
                    <Link
                      to={`tel:${vendor.business.phone}`}
                      target='_blank'
                      rel='noopener noreferrer'
                    >
                      <img src={phoneIcon} alt='Background' />
                    </Link>
                  </Fab>
                </Box>
              )}

              <h2>Services</h2>
              {vendor.services.length > 0 ? (
                vendor.services.map((service, index) => (
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
              {vendor.facebook && (
                <Link
                  to={vendor.facebook}
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
              {vendor.youTube && (
                <Link
                  to={vendor.youTube}
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
              {vendor.instagram && (
                <Link
                  to={vendor.instagram}
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
              {vendor.linkedIn && (
                <Link
                  to={vendor.linkedIn}
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
              {vendor.tikTok && (
                <Link
                  to={vendor.tikTok}
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
              {vendor.email && (
                <Link
                  to={`mailto:${vendor.email}`}
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    className={classes.socialIcon}
                    src={emailLogo}
                    alt='Email'
                  />
                </Link>
              )}
              <ThemeProvider theme={button}>
                <Box
                  sx={{
                    display: 'flex',
                    justifyContent: 'center',
                    marginBottom: '20px',
                  }}
                >
                  <Button href='/book-appointment'>Continue</Button>
                </Box>
              </ThemeProvider>
            </Box>
          </Box>
        ))}
      </Card>
    </Page>
  );
}

export default ClientView;
