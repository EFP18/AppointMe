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
  Grid,
} from '@mui/material';
import { Stack, styled } from '@mui/system';
import { colors } from '../../components/theme';
import { ThemeProvider } from '@mui/material/styles';
import button from '../../components/button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import './Signup.css';
import Page from '../../components/Page';
import Auth from '../../utils/auth';
import { useMutation } from '@apollo/client';
import { ADD_VENDOR } from '../../utils/mutation';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
  minHeight: '100vh',
  // backgroundColor: colors.grey,
  boxShadow: colors.shadow,
});

const StyledCard = styled(Card)({
  padding: '20px',
  width: '100%',
  maxWidth: '400px',
  boxSizing: 'border-box',
  borderRadius: '15px',
  backgroundColor: colors.white,
  boxShadow: colors.shadow,
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);

  const [addVendor_mutator] = useMutation(ADD_VENDOR);

  const handleInputChange = event => {
    const { name, value } = event.target;
    console.log({ userFormData });
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async event => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // const response = await createUser(userFormData);
      const response = await addVendor_mutator({
        variables: userFormData,
      });

      const { token } = response.data.addVendor;
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
        <Grid
          container
          justifyContent='center'
          alignItems='center'
          style={{ minHeight: '100vh' }}
        >
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <StyledCard>
              <h1 style={{ textAlign: 'left' }}>Sign Up</h1>
              <TextField
                name='email'
                value={userFormData.email}
                placeholder='Your email'
                label='Email'
                // name='email'
                variant='outlined'
                margin='normal'
                required
                fullWidth
                onChange={handleInputChange}
              />
              <TextField
                placeholder='Your password'
                label='Password'
                name='password'
                value={userFormData.password}
                variant='outlined'
                margin='normal'
                required
                fullWidth
                // onChange={handleInputChange}
                // value={userFormData.password}
                type={showPassword ? 'text' : 'password'}
                onChange={handleInputChange}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position='end'>
                      <IconButton
                        onClick={() => setShowPassword(!showPassword)}
                        onMouseDown={event => event.preventDefault()}
                      >
                        {showPassword ? <Visibility /> : <VisibilityOff />}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />
              <ThemeProvider theme={button}>
                <Button
                sx={{ marginBottom: '12px'}}
                  variant='contained'
                  fullWidth
                  onClick={handleFormSubmit}
                  disabled={!(userFormData.email && userFormData.password)}
                >
                  <Box fontWeight='fontWeightBold'>SIGN UP</Box>
                </Button>
              </ThemeProvider>
             
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
          </Grid>
        </Grid>
      </Container>
    </Page>
  );
};

export default Signup;
