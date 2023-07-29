import React, { useState } from 'react';
import {
  Box,
  TextField,
  Button,
  Link,
  Card,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../components/theme';
import { ThemeProvider } from '@mui/material/styles';
import button from '../../components/button';
import linkedInLogo from '../../assets/img/linkedin.png';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Signup.css';
import Page from '../../components/Page';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  backgroundColor: colors.grey,
  boxShadow: colors.shadow,
});

const StyledCard = styled(Card)({
  padding: '20px',
  width: '400px',
  boxSizing: 'border-box',
  borderRadius: '15px',
  backgroundColor: colors.white,
  boxShadow: colors.shadow,
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Page title={'Signup - AppointMe'}>
      <Container>
        <StyledCard>
          <h1 style={{ textAlign: 'left' }}>Sign Up</h1>
          <TextField
            label='Email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
          />
          <TextField
            label='Password'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            type={showPassword ? 'text' : 'password'}
            InputProps={{
              endAdornment: (
                <InputAdornment position='end'>
                  <IconButton
                    onClick={() => setShowPassword(!showPassword)}
                    onMouseDown={(event) => event.preventDefault()}
                  >
                    {showPassword ? <Visibility /> : <VisibilityOff />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <ThemeProvider theme={button}>
            <Button type='submit' variant='contained' fullWidth>
              <Box fontWeight='fontWeightBold'>SIGN UP</Box>
            </Button>
          </ThemeProvider>
          <Box my={3}>
            <Divider>OR</Divider>
          </Box>
          <Box my={2} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            <div id='signInButton' data-onsuccess='onSignIn'></div>
            <img src={linkedInLogo} alt='LinkedIn' />
          </Box>
          <Box style={{ color: colors.black }}>
            Already a user?{' '}
            <Link
              href='/login'
              variant='body2'
              style={{ color: colors.primary }}
            >
              Login
            </Link>
          </Box>
        </StyledCard>
      </Container>
    </Page>
  );
};

export default Signup;
