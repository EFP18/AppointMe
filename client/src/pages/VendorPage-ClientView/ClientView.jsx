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
import { useStyles } from './clientViewStyles';
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
import { GET_BUSINESS } from '../../utils/queries';
import { useQuery } from '@apollo/client';

function ClientView(props) {
  const classes = useStyles();

  const { loading, data } = useQuery(GET_BUSINESS);
  const businessData = data?.business || {};
  const socialObj = businessData?.socialMedia || {};
  const [checkedService, setCheckedService] = useState(null);

  return (
    // dynamically create business name
    <Page title={`${businessData.name} - AppointMe`}>
      <Header />
      <Card sx={{ backgroundColor: colors.grey, padding: '20px' }}>
        {/* {vendorData.map((vendor) => ( */}
        {/* {businessData.map((business) => ( */}
        <Box sx={{ display: 'flex', alignItems: 'center', marginLeft: '10px' }}>
          <Box className={classes.profile}>
            <Box className={classes.header}>
              <img
                className={classes.bgImage}
                src={businessData.logo ? businessData.logo : stockBackgroundImg}
                alt='Background'
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
                    <Typography variant='h4'>{businessData.name}</Typography>
                    {/* <Typography variant='body1' className={classes.location}>
                      {businessData.firstName}
                    </Typography> */}
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

            {businessData.phone && (
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
                    to={`tel:${businessData.phone}`}
                    target='_blank'
                    rel='noopener noreferrer'
                  >
                    <img src={phoneIcon} alt='Background' />
                  </Link>
                </Fab>
              </Box>
            )}

            <h2>Services</h2>
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
            {socialObj.facebook && (
              <Link
                to={`//${socialObj.facebook}`}
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
            {socialObj.youTube && (
              <Link
                to={`//${socialObj.youTube}`}
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
            {socialObj.instagram && (
              <Link
                to={`//${socialObj.instagram}`}
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
            {socialObj.linkedIn && (
              <Link
                to={`//${socialObj.linkedIn}`}
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
            {socialObj.tikTok && (
              <Link
                to={`//${socialObj.tikTok}`}
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
        {/* ))} */}
      </Card>
    </Page>
  );
}

export default ClientView;
