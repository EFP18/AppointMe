import React, { useState } from "react";
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Divider,
} from "@mui/material";
import { ThemeProvider } from "@mui/material/styles";
import { colors } from "../../components/theme";
import button from "../../components/button";
import "./VendorProfile.css";
import Navbar from "../../components/Navbar";

export default function VendorProfile() {
  const [category, setCategory] = React.useState("");
  const [isSaved, setIsSaved] = useState(false);

  const handleChange = event => {
    setCategory(event.target.value);
  };
  return (
    <div>
      <Navbar />
      <Box sx={{  marginLeft: '100px', flexGrow: 1 }}>
        <h1>Edit Profile</h1>
        <ThemeProvider theme={button}>
          <form>
            <TextField
              label="Name"
              variant="outlined"
              fullWidth
              margin="normal"
              placeholder="John Doe"
            />
            <TextField
              label="Description"
              variant="outlined"
              multiline
              rows={4}
              fullWidth
              margin="normal"
              placeholder="Describe your business in a few words"
            />
            <Button variant="contained" component="label" fullWidth>
              Upload Profile Picture
              <input type="file" hidden />
            </Button>

            <Divider
              style={{ margin: "30px 0", backgroundColor: colors.black }}
            />

            <h2>Categories/Tags</h2>
            <FormControl fullWidth variant="outlined" margin="normal">
              <InputLabel id="category-label">Category *</InputLabel>
              <Select
                labelId="category-label"
                value={category}
                onChange={handleChange}
                label="Category"
              >
                <MenuItem value={"hair-beauty"}>Hair/Beauty</MenuItem>
                <MenuItem value={"music"}>Music</MenuItem>
                <MenuItem value={"lawn-gardening"}>Lawn/Gardening</MenuItem>
                <MenuItem value={"cooking"}>Cooking</MenuItem>
                <MenuItem value={"other"}>Other</MenuItem>
              </Select>
            </FormControl>

            <h2>Social Links</h2>
            <TextField
              label="Youtube"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Facebook"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Instagram"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Facebook"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="TikTok"
              variant="outlined"
              fullWidth
              margin="normal"
            />

<h2>Contact Information</h2>
            <TextField
              label="Email"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Phone Number"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <h2>Location</h2>
            <TextField
              label="Location"
              variant="outlined"
              fullWidth
              margin="normal"
            />

            <h2>Services</h2>
            <TextField
              label="Service Name"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <TextField
              label="Service Cost ($)"
              variant="outlined"
              fullWidth
              margin="normal"
            />
            <Button variant="contained" fullWidth>
              Add Another Service
            </Button>

            <h2>Availability</h2>
            {/* Add your availability component here */}

            <Button
              variant="contained"
              fullWidth
              onClick={() => setIsSaved(true)}
              style={{ marginTop: "30px" }}
            >
              Save Profile
            </Button>

            {/* Show a message after the user clicks "Save Profile" */}
            {isSaved && <p>Your profile has been saved!</p>}
            <Button variant="contained" fullWidth style={{ marginTop: "15px" }}>
              View Profile
            </Button>
          </form>
        </ThemeProvider>
      </Box>
    </div>
  );
}
