import React, { useState } from 'react';
import {
  Box,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
  Card,
  Divider,
  InputAdornment,
  IconButton,
} from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../components/theme';
import linkedInLogo from '../../assets/img/linkedin.png';
import { ThemeProvider } from '@mui/material/styles';
import button from '../../components/button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Page from '../../components/Page';
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);

  return (
    // <GoogleOAuthProvider
    //   clientId='14362999735-d6did93g2g0t0nipqoq7ge2pu2tuu2bu.apps.googleusercontent.com'
    // >
      <Page title={'Login - AppointMe'}>
        <Container>
          <StyledCard>
            <h1 style={{ textAlign: 'left' }}>Login</h1>
            <TextField
              label='Email'
              variant='outlined'
              margin='normal'
              required
              fullWidth
              InputProps={{
                style: { borderRadius: '10px' },
              }}
            />
            <TextField
              label='Password'
              variant='outlined'
              margin='normal'
              required
              fullWidth
              type={showPassword ? 'text' : 'password'}
              InputProps={{
                style: { borderRadius: '10px' },
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
            <FormControlLabel
              control={
                <Checkbox
                  value='remember'
                  sx={{
                    color: colors.primary,
                    '&.Mui-checked': { color: colors.primary },
                  }}
                />
              }
              label='Remember me'
            />
            <ThemeProvider theme={button}>
              <Button type='submit' variant='contained' fullWidth>
                <Box fontWeight='fontWeightBold'>LOGIN</Box>
              </Button>
            </ThemeProvider>
            <Box my={3}>
              <Divider>OR</Divider>
            </Box>
            <Box
              my={2}
              sx={{ display: 'flex', justifyContent: 'space-evenly' }}
            >
              {/* google */}
              {/* <GoogleLogin
                onSuccess={(credentialResponse) => {
                  console.log(credentialResponse);
                }}
                onError={() => {
                  console.log('Login Failed');
                }}
              /> */}
              <img src={linkedInLogo} alt='LinkedIn' />
            </Box>
            <Box style={{ color: colors.black }}>
              Need an account?{' '}
              <Link
                href='/signup'
                variant='body2'
                style={{ color: colors.primary }}
              >
                Sign Up
              </Link>
            </Box>
          </StyledCard>
        </Container>
      </Page>
    // </GoogleOAuthProvider>
  );
};

export default Login;
