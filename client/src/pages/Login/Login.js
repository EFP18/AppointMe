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
import { useMutation } from '@apollo/client';
import { LOGIN_VENDOR } from '../../utils/mutation';
import Auth from '../../utils/auth';

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
  // set initial form state
  const [userFormData, setUserFormData] = useState({ email: '', password: '' });
  // set state for form validation
  const [validated] = useState(false);

  const [loginVendor_mutator] = useMutation(LOGIN_VENDOR);

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log({ userFormData });
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

      const { token } = response?.data?.loginVendor;
      Auth.login(token);
    } catch (err) {
      console.error(err);
    }

    setUserFormData({
      email: '',
      password: '',
    });

    return (
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
                type='submit'
                variant='contained'
                fullWidth
                onClick={handleFormSubmit}
                disabled={!(userFormData.email && userFormData.password)}
              >
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
    );
  };
};

export default Login;
