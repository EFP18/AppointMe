import * as React from 'react';
import { Box, styled } from '@mui/system';
import { Card, Typography } from '@mui/material';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import HeaderNoButton from '../../components/HeaderNoButton';
import Page from '../../components/Page';
import Footer from '../../components/Footer';
import { colors } from '../../components/theme';


const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'flex-start',
  minHeight: '100vh',
  boxShadow: colors.shadow,
});

function Affirmation() {
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

  const affirmations = [
    'You are enough.',
    'You have the power to create change.',
    'Every challenge you face is an opportunity for growth.',
    'You are capable of achieving great things.',
    'Your potential is limitless.',
    'Believe in yourself, as others believe in you.',
    'You bring a unique light to the world.',
    'Every day, you become a better version of yourself.',
    'Your strength is greater than any obstacle.',
    'You deserve all the happiness in the world.',
  ];

  const randomAffirmation =
    affirmations[Math.floor(Math.random() * affirmations.length)];

  return (
    <Page title={'AppointMe'} className='landing-page'>
      <HeaderNoButton />
      <Box>
        <Container fixed>
          <StyledCard>
            <h1 style={{ textAlign: 'middle', color: colors.black }}>
              {' '}
              Words of Affirmation
            </h1>

            <Typography align='center'>
              <h2>{randomAffirmation}</h2>
            </Typography>
          </StyledCard>
        </Container>
      </Box>
      <Footer />
    </Page>
  );
}

export default Affirmation;
