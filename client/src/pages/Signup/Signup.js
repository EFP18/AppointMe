import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Link,
  Card,
  Divider,
  InputAdornment,
  IconButton,
} from "@mui/material";
import { styled } from "@mui/system";
import { colors } from "../../components/theme";
import { ThemeProvider } from "@mui/material/styles";
import button from "../../components/button";
import linkedInLogo from "../../assets/img/linkedin.png";
import appleLogo from "../../assets/img/apple.png";
import googleLogo from "../../assets/img/google.png";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import "./Signup.css";

const Container = styled(Box)({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  minHeight: "100vh",
  backgroundColor: colors.grey,
  boxShadow: colors.shadow,
});

const StyledCard = styled(Card)({
  padding: "20px",
  width: "400px",
  boxSizing: "border-box",
  borderRadius: "15px",
  backgroundColor: colors.white,
  boxShadow: colors.shadow,
});

const Signup = () => {
  const [showPassword, setShowPassword] = useState(false);
  return (
    <Container>
      <StyledCard>
        <h1 style={{ textAlign: "left" }}>Sign Up</h1>
        <TextField
          label="Email"
          variant="outlined"
          margin="normal"
          required
          fullWidth
        />
        <TextField
          label="Password"
          variant="outlined"
          margin="normal"
          required
          fullWidth
          type={showPassword ? "text" : "password"}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
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
          <Button type="submit" variant="contained" fullWidth>
            <Box fontWeight="fontWeightBold">SIGN UP</Box>
          </Button>
        </ThemeProvider>
        <Box my={3}>
          <Divider>OR</Divider>
        </Box>
        <Box my={2} sx={{ display: "flex", justifyContent: "space-evenly" }}>
          <img src={googleLogo} alt="Google" />
          {/* <img src={appleLogo} alt="Apple" /> */}
          <img src={linkedInLogo} alt="LinkedIn" />
        </Box>
        <Box style={{ color: colors.black }}>
          Already a user?{" "}
          <Link href="/login" variant="body2" style={{ color: colors.primary }}>
            LOGIN
          </Link>
        </Box>
      </StyledCard>
    </Container>
  );
};

export default Signup;
