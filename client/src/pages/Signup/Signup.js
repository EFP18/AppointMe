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
import Auth from '../../utils/auth'
// import { GoogleLogin } from '@react-oauth/google';

import { useMutation } from '@apollo/client';

import { ADD_VENDOR } from '../../utils/mutation';

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
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [ addVendor, { error }] = useMutation(ADD_VENDOR);

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
      const { data } = await addVendor({
        variables: {...userFormData}
      });

        if (!data) {
        throw new Error('something went wrong!');
      }

      const { token, vendor } = data.addVendor;
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
    <Page title={'Signup - AppointMe'}>
      <Container>
        <StyledCard>
          <h1 style={{ textAlign: 'left' }}>Sign Up</h1>
          <TextField
            label='Email'
            name='email'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            value={userFormData.email}
            onChange={handleInputChange}
          />
          <TextField
            label='Password'
            name='password'
            variant='outlined'
            margin='normal'
            required
            fullWidth
            onChange={handleInputChange}
            value={userFormData.password}
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
            <Button 
              onClick={handleFormSubmit}
              variant='contained' 
              fullWidth
              disabled={!(userFormData.email && userFormData.password)}
              >
              <Box fontWeight='fontWeightBold'>SIGN UP</Box>
            </Button>
          </ThemeProvider>
          <Box my={3}>
            <Divider>OR</Divider>
          </Box>
          <Box my={2} sx={{ display: 'flex', justifyContent: 'space-evenly' }}>
            {/* <div id='signInButton' data-onsuccess='onSignIn'></div> */}
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
