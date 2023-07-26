import React from 'react';
import { Box, TextField, Checkbox, Button, FormControlLabel, Link } from '@mui/material';
import styled from '@emotion/styled';

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Login = () => (
  <Container>
    <h1>Login</h1>
    <TextField label="Email" variant="outlined" margin="normal" required fullWidth />
    <TextField label="Password" variant="outlined" margin="normal" required fullWidth type="password" />
    <FormControlLabel control={<Checkbox value="remember" color="primary" />} label="Remember me" />
    <Button type="submit" variant="contained" fullWidth>Login</Button>
    <Box className="logo" my={2}>
      <Button variant="contained" fullWidth>Sign in with Google</Button>
      <Button variant="contained" fullWidth>Sign in with Apple</Button>
      <Button variant="contained" fullWidth>Sign in with LinkedIn</Button>
    </Box>
    <Link href="/signup" variant="body2">Need an account? Sign Up</Link>
  </Container>
);

export default Login;
