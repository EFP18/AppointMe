import React from 'react';
import { Box, TextField, Checkbox, Button, FormControlLabel, Link } from '@mui/material';
import styled from '@emotion/styled';
import './Signup.css'

const Container = styled(Box)({
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  justifyContent: 'center',
});

const Signup = () => (
  <Container>
    <h1>Sign Up</h1>
    <TextField label="Email" variant="outlined" margin="normal" required fullWidth />
    <TextField label="Password" variant="outlined" margin="normal" required fullWidth type="password" />
    <Button type="submit" variant="contained" fullWidth>Login</Button>
    <Box className="logo" my={2}>
      <Button variant="contained" fullWidth>Sign in with Google</Button>
      <Button variant="contained" fullWidth>Sign in with Apple</Button>
      <Button variant="contained" fullWidth>Sign in with LinkedIn</Button>
    </Box>
    <Link href="/login" variant="body2">Already a user? LOGIN</Link>
  </Container>
);

export default Signup;
