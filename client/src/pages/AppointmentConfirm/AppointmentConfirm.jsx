import * as React from 'react';
import { Box, styled } from '@mui/system';
import { Card, Grid, Typography, Alert } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import HeaderNoButton from '../../components/HeaderNoButton';
import Page from '../../components/Page';
import SearchBox from '../../components/SearchBox';
import Footer from '../../components/Footer';
import { colors } from '../../components/theme';
import categoryData from '../VendorProfile/categorySeeds.json';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  boxShadow: colors.shadow,
});

function AppointmentConfirm() {
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
      <HeaderNoButton />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Container fixed>
          <StyledCard>
            <h1 style={{ textAlign: 'middle', color: colors.black }}>
              {' '}
              Welcome to AppointMe
            </h1>
            <Alert color='success' variant='filled' severity='success'>
              <Typography align='center'>
                <h2>Thank you for booking your appointment with us!</h2>
                <h3>Appointment Confirmed</h3>
              </Typography>
            </Alert>
          </StyledCard>
        </Container>
      </Box>
      <Footer />
    </Page>
  );
}

export default AppointmentConfirm;
