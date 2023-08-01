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
import Auth from '../../utils/auth'
// import { GoogleLogin } from '@react-oauth/google';
// import { GoogleOAuthProvider } from '@react-oauth/google';

import { useMutation } from '@apollo/client';

import { LOGIN_VENDOR } from '../../utils/mutation';

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
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [ login, { error }] = useMutation(LOGIN_VENDOR);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setUserFormData({ ...userFormData, [name]: value });
  };


  const handleFormSubmit = async (event) => {
    event.preventDefault();

    // check if form has everything (as per react-bootstrap docs)
    const form = event.currentTarget;
    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      const { data } = await login({
        variables: {...userFormData}
      });

        if (!data) {
        throw new Error('something went wrong!');
      }

      const { token, vendor } = data.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

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
              name='email'
              variant='outlined'
              margin='normal'
              required
              fullWidth
              value={userFormData.email}
              InputProps={{
                style: { borderRadius: '10px' },
              }}
              onChange={handleInputChange}
            />
            <TextField
              label='Password'
              variant='outlined'
              margin='normal'
              required
              fullWidth
              onChange={handleInputChange}
              type={showPassword ? 'text' : 'password'}
              value={userFormData.password}
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
              <Button type='submit' variant='contained' fullWidth
                onClick={handleFormSubmit}>
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
