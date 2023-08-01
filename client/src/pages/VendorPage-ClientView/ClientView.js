import React, { useState } from 'react';
import { Button, Box, Checkbox, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import { colors } from '../../components/theme';
import youtubeLogo from './img/youtube2.png';
import facebookLogo from './img/facebook2.png';
import instagramLogo from './img/instagram2.png';
import linkedInLogo from './img/linkedin2.png';
import tiktokLogo from './img/tik-tok2.png';
import emailLogo from './img/email2.png';
import stockImg from './img/stock-photo.png';
import stockBackgroundImg from './img/bgimg.png';
import Page from '../../components/Page';
import { Link } from 'react-router-dom';
import Header from '../../components/Header';
import phoneIcon from './img/phone.png';
import Fab from '@mui/material/Fab';
// import { GET_VENDOR } from '../../utils/queries';
// import { useQuery } from '@apollo/client';
// testing
import vendorData from './vendorSeeds.json';

const useStyles = makeStyles({
  profile: {
    marginLeft: '90px',
    flexGrow: 1,
    color: colors.black,
    backgroundColor: colors.white,
  },
  header: {
    position: 'relative',
    height: '200px',
    marginBottom: '60px',
  },
  bgImage: {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  },
  profileInfo: {
    // position: 'absolute',
    bottom: '-50px',
    display: 'flex',
    alignItems: 'center',
    width: '100%',
  },
  profileImage: {
    borderRadius: '50%',
    width: '100px',
    height: '100px',
    objectFit: 'cover',
    marginRight: '10px',
    marginLeft: '25px',
  },
  nameAndButton: {
    display: 'flex',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: '50px',
    width: '100%',
  },
  name: {
    fontSize: '24px',
    color: colors.black,
    fontWeight: 'bold',
  },
  location: {
    fontSize: '16px',
    color: colors.gray,
  },
  description: {
    padding: '7% 15%',
    textAlign: 'left',
  },
  service: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    margin: '10px 0',
    padding: '0 25%',
  },
  serviceName: {
    flexGrow: 1,
  },
  socialIcon: {
    margin: '20px 0',
    width: '30px',
    height: '30px',
    marginRight: '10px',
  },
});

function ClientView(props) {
  const classes = useStyles();

  // const {loading, data} = useQuery(GET_VENDOR);
  // const vendorData = data?.vendor || {};

  const [checkedService, setCheckedService] = useState(null);

  return (
    // dynamically create vendor or business name
    <Page title={'Vendor Profile - AppointMe'}>
      <Header />
      {vendorData.map((vendor) => (
      <Box sx={{ display: 'flex' }}>
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
                  <Typography variant='h4' className={classes.name}>
                  {vendor.name}
                  </Typography>
                  <Typography variant='body1' className={classes.location}>
                  {vendor.firstName}
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          <Typography className={classes.description}>{vendor.description}</Typography>

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
            <Link to={vendor.facebook} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={facebookLogo}
                alt='Facebook'
              />
            </Link>
          )}
          {vendor.youTube && (
            <Link to={vendor.youTube} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={youtubeLogo}
                alt='YouTube'
              />
            </Link>
          )}
          {vendor.instagram && (
            <Link to={vendor.instagram} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={instagramLogo}
                alt='Instagram'
              />
            </Link>
          )}
          {vendor.linkedIn && (
            <Link to={vendor.linkedIn} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={linkedInLogo}
                alt='LinkedIn'
              />
            </Link>
          )}
          {vendor.tikTok && (
            <Link to={vendor.tikTok} target='_blank' rel='noopener noreferrer'>
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
              <img className={classes.socialIcon} src={emailLogo} alt='Email' />
            </Link>
          )}
        </Box>
      </Box>
      ))}
    </Page>
  );
}

export default ClientView;
