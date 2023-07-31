import * as React from 'react';
import Header from '../../components/Header';
import './LandingPage.css';
import Page from '../../components/Page';
import Card from '@mui/material/Card';
import Typography from '@mui/material/Typography';
import { styled } from '@mui/system';
import { Box } from '@mui/system';
import SearchBox from '../../components/SearchBox';
import { Grid } from '@mui/material';
import { colors } from '../../components/theme';
import services from '../../data/services';
import Footer from '../../components/Footer';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  backgroundColor: colors.grey,
  boxShadow: colors.shadow,
});

const StyledCard = styled(Card)({
  padding: '40px',
  width: '80%',
  height: '400px',
  boxSizing: 'border-box',
  borderRadius: '15px',
  backgroundColor: colors.white,
  boxShadow: colors.shadow,
  marginTop: '100px',
});

function LandingPage() {
  const [selectedService, setSelectedService] = React.useState(null);

  return (
    <Page title={'AppointMe'} className='landing-page'>
      <Header />
      <Container maxWidth='xl'>
        <StyledCard>
          <h1 style={{ textAlign: 'left', color: colors.black }}>
            {' '}
            Welcome to AppointMe
          </h1>
          <Typography
            variant='h6' 
            align='left'
            style={{ color: colors.gr }}
          >
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
                details={services}
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
