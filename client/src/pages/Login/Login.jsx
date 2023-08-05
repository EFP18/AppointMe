import React, { useState } from 'react';
import {
  Box,
  Alert,
  TextField,
  Checkbox,
  Button,
  FormControlLabel,
  Link,
  Card,
  Divider,
  InputAdornment,
  IconButton,
  Grid,
} from '@mui/material';
import { styled } from '@mui/system';
import { colors } from '../../components/theme';
import { ThemeProvider } from '@mui/material/styles';
import button from '../../components/button';
import Visibility from '@mui/icons-material/Visibility';
import VisibilityOff from '@mui/icons-material/VisibilityOff';
import Page from '../../components/Page';
import { useMutation } from '@apollo/client';
import { LOGIN_VENDOR } from '../../utils/mutation';
import Auth from '../../utils/auth';
import HomeRoundedIcon from '@mui/icons-material/HomeRounded';
import HeaderNoButton from '../../components/HeaderNoButton';

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

const Login = () => {
  const [showPassword, setShowPassword] = useState(false);
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  const [showAlert, setShowAlert] = useState(false);
  const [loginVendor_mutator] = useMutation(LOGIN_VENDOR);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    // console.log({ userFormData });
    setUserFormData({ ...userFormData, [name]: value });
  };

  const handleFormSubmit = async (event) => {
    event.preventDefault();

    const form = event.currentTarget;

    if (form.checkValidity() === false) {
      event.preventDefault();
      event.stopPropagation();
    }

    try {
      // const response = await createUser(userFormData);
      const response = await loginVendor_mutator({
        variables: userFormData,
      });

      const { token } = response?.data?.login;
      Auth.login(token);
    } catch (err) {
      console.error(err);
      setShowAlert(true);
    }

    setUserFormData({
      email: '',
      password: '',
    });
  };

  return (
    <Page title={'Login - AppointMe'}>
      <HeaderNoButton />
      <Container>
        <Grid item xs={12} sm={8} md={6} lg={4}>
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
              name='email'
              value={userFormData.email}
              placeholder='Your email'
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
              type={showPassword ? 'text' : 'password'}
              onChange={handleInputChange}
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
              <Button
                sx={{ marginBottom: '12px' }}
                variant='contained'
                fullWidth
                onClick={handleFormSubmit}
                disabled={!(userFormData.email && userFormData.password)}
              >
                <Box fontWeight='fontWeightBold'>LOGIN</Box>
              </Button>
            </ThemeProvider>
            {showAlert && (
              <Alert severity='error' onClose={() => setShowAlert(false)}>
                Something went wrong with your login credentials! Please try
                again.
              </Alert>
            )}

            <Box style={{ color: colors.black }}>
              Need an account?{' '}
              <Link
                href='/signup'
                variant='body2'
                style={{ color: colors.primary, paddingTop: '5px' }}
              >
                Sign Up
              </Link>
            </Box>
          </StyledCard>
        </Grid>
      </Container>
    </Page>
  );
};

export default Login;
