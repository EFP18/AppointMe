import React, { useState } from 'react';
import { Button, Box, Checkbox, Typography, Divider } from '@mui/material';
import { makeStyles } from '@mui/styles';
import button from '../../components/button';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { colors } from '../../components/theme';
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
import { Link } from 'react-router-dom';
import { GET_VENDOR } from '../../utils/queries';
import { useQuery } from '@apollo/client';

// get all --> returns an []
// get one --> returns an {}
// map only when it's an array

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

function ProfileView(props) {
  // for testing
  const id = '8hef9efhefe9h';

  const [loading, data] = useQuery(GET_VENDOR, { variables: { _id: id } });
  const vendorData = data?.vendor || {};

  const classes = useStyles();
  const {
    name = vendorData.business.name,
    // vendor name
    firstName = vendorData.firstName,
    // location = 'Peru',
    description = vendorData.business.description,
    image = vendorData.business.image,
    logo = vendorData.business.logo,
    // external links require // in front of them to redirect successfully
    youTube = '//' + vendorData.business.socialMedia.youTube,
    facebook = '//' + vendorData.business.socialMedia.facebook,
    instagram = '//' + vendorData.business.socialMedia.instagram,
    linkedIn = '//' + vendorData.business.socialMedia.linkedIn,
    tikTok = '//' + vendorData.business.socialMedia.tikTok,
    email = vendorData.business.email,
    services = [
      {
        name: vendorData.business.services.name,
        description: vendorData.business.services.description,
        price: vendorData.business.services.price,
      },
    ],
    availability,
    tags = vendorData.business.tags.name,
  } = props;

  const [checkedService, setCheckedService] = useState(null);

  return (
    <Page title={'My Profile - AppointMe'} className='landing-page'>
      <Box sx={{ display: 'flex' }}>
        <Navbar />
        <Box className={classes.profile}>
          <Box className={classes.header}>
            <img
              className={classes.bgImage}
              src={logo ? logo : stockBackgroundImg}
              alt='logo'
            />
            <Box className={classes.profileInfo}>
              <img
                className={classes.profileImage}
                src={image ? image : stockImg}
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
                    {name}
                  </Typography>
                  <Typography variant='body1' className={classes.location}>
                    {firstName}
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

          <Typography className={classes.description}>{description}</Typography>

          <Divider
            style={{ margin: '2% 10% 4%', backgroundColor: colors.primary }}
          />

          <h2>Services</h2>
          {services.length > 0 ? (
            services.map((service, index) => (
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
          {facebook && (
            <Link to={facebook} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={facebookLogo}
                alt='Facebook'
              />
            </Link>
          )}
          {youTube && (
            <Link to={youTube} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={youtubeLogo}
                alt='YouTube'
              />
            </Link>
          )}
          {instagram && (
            <Link to={instagram} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={instagramLogo}
                alt='Instagram'
              />
            </Link>
          )}
          {linkedIn && (
            <Link to={linkedIn} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={linkedInLogo}
                alt='LinkedIn'
              />
            </Link>
          )}
          {tikTok && (
            <Link to={tikTok} target='_blank' rel='noopener noreferrer'>
              <img
                className={classes.socialIcon}
                src={tiktokLogo}
                alt='TikTok'
              />
            </Link>
          )}
          {email && (
            <Link
              to={`mailto:${email}`}
              target='_blank'
              rel='noopener noreferrer'
            >
              <img className={classes.socialIcon} src={emailLogo} alt='Email' />
            </Link>
          )}
        </Box>
      </Box>
    </Page>
  );
}

export default ProfileView;



