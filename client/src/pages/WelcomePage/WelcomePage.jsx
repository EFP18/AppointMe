import * as React from 'react';
import { Box, Card, Grid, Typography, Button } from '@mui/material';
import { styled } from '@mui/system';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import Navbar from '../../components/Navbar/Navbar';
import { colors } from '../../components/theme';
import button from '../../components/button';
import Page from '../../components/Page';
import { ThemeProvider } from '@mui/material/styles';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '100vh',
});

function WelcomePage() {
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
    <Page title={'Welcome to AppointMe'} className='landing-page'>
      <Navbar />
      <Box
        sx={{
          display: 'flex',
          flexDirection: { xs: 'column', sm: 'row' },
          alignItems: 'center',
          justifyContent: 'center',
          marginLeft: { xs: '20%', sm: '10%', md: '20xp' },
        }}
      >
        <Container maxWidth='xl'>
          <StyledCard sx={{ backgroundColor: colors.white }}>
            <h1 style={{ textAlign: 'left', color: colors.black }}>
              Welcome to AppointMe
            </h1>
            <Typography
              variant='h6'
              align='left'
              style={{ color: colors.black }}
            >
              Your one-stop solution to manage your profile, calendar, schedule,
              and client database.
            </Typography>
            <Grid
              container
              // display='flex'
              direction='row'
              justifyContent='center'
              alignItems='center'
              spacing={2}
              mt={2}
            >
              <Grid item>
                <Typography variant='h6' style={{ color: colors.black }}>
                  <h3>Let's get started:</h3>
                </Typography>
              </Grid>

              <Grid item>
                <ThemeProvider theme={button}>
                  <Button
                    href='/vendorprofile'
                    variant='contained'
                    style={{ marginRight: '40px', marginTop: 0 }}
                  >
                    ✎ Create Profile
                  </Button>
                </ThemeProvider>
              </Grid>
            </Grid>
          </StyledCard>
        </Container>
      </Box>
    </Page>
  );
}

export default WelcomePage;
