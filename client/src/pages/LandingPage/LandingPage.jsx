import * as React from 'react';
import { Box, styled } from '@mui/system';
import { Card, Grid, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Header from '../../components/Header';
import Page from '../../components/Page';
import SearchBox from '../../components/SearchBox';
import Footer from '../../components/Footer';
import { colors } from '../../components/theme';
import categoryData from '../VendorProfile/categorySeeds.json';
import './LandingPage.css';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  // justifyContent: 'center',
  minHeight: '100vh',
  flex: 1,
  // boxShadow: colors.shadow,
});

function LandingPage() {
  const [selectedService, setSelectedService] = React.useState(null);
  const theme = useTheme();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('sm'));

  const StyledCard = styled(Card)({
    padding: isSmallScreen ? '20px' : '40px',
    width: '80%',
    height: '55%',
    boxSizing: 'border-box',
    borderRadius: '15px',
    backgroundColor: colors.white,
    boxShadow: colors.shadow,
    marginTop: isSmallScreen ? '50px' : '100px',
    marginBottom: isSmallScreen ? '50px' : '100px',
  });

  return (
    <Page title={'AppointMe'} className='landing-page'>
      <Header />

      <Container sx={{ display: 'flex'}}>
        <StyledCard>
          <h1 style={{ textAlign: 'left', color: colors.black }}>
            {' '}
            Welcome to AppointMe
          </h1>
          <Typography variant='h6' align='left' style={{ color: colors.gr }}>
            AppointMe is the ultimate platform for service providers and
            seekers. Whether you are a vendor who wants to showcase your skills
            and manage your bookings, or a client who wants to find and book the
            best service for your needs, AppointMe has you covered. You can
            create your own profile, browse through thousands of services, and
            schedule appointments with ease. All that, under the same roof!
          </Typography>
          <Grid
            container
            direction='row'
            justifyContent='center'
            alignItems='center'
            spacing={2}
            mt={2}
          >
            <Grid item>
              <Typography variant='h6' style={{ color: colors.black }}>
                <h3>Search for a</h3>
              </Typography>
            </Grid>
            <Grid item>
              <SearchBox
                details={categoryData}
                onSelect={service => {
                  setSelectedService(service);
                }}
              />
            </Grid>
          </Grid>
        </StyledCard>
      </Container>

      <Footer />
    </Page>
  );
}

export default LandingPage;
