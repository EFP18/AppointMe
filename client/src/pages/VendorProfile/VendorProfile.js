import React from 'react';
import { Button, TextField, Select, MenuItem, InputLabel, FormControl } from "@mui/material";
import './VendorProfile.css'

export default function VendorProfile() {
  const [category, setCategory] = React.useState('');

  const handleChange = (event) => {
    setCategory(event.target.value);
  };
  return (
    <div>
      <h1>Edit Profile</h1>
      <form>
        <TextField label="Name" variant="outlined" fullWidth />
        <TextField label="Description" variant="outlined" multiline rows={4} fullWidth />
        <Button variant="contained" component="label" fullWidth>
          Upload Profile Picture
          <input type="file" hidden />
        </Button>

        <h2>Categories/Tags</h2>
      <FormControl fullWidth variant="outlined">
        <InputLabel id="category-label">Category</InputLabel>
        <Select
          labelId="category-label"
          value={category}
          onChange={handleChange}
          label="Category"
        >
          <MenuItem value={'hair-beauty'}>Hair/Beauty</MenuItem>
          <MenuItem value={'music'}>Music</MenuItem>
          <MenuItem value={'lawn-gardening'}>Lawn/Gardening</MenuItem>
          <MenuItem value={'cooking'}>Cooking</MenuItem>
          <MenuItem value={'other'}>Other</MenuItem>
        </Select>
      </FormControl>

        <h2>Social Links</h2>
        <TextField label="Youtube" variant="outlined" fullWidth />
        <TextField label="Facebook" variant="outlined" fullWidth />
        <TextField label="Instagram" variant="outlined" fullWidth />
        <TextField label="LinkedIn" variant="outlined" fullWidth />
        <TextField label="TikTok" variant="outlined" fullWidth />

        <h2>Contact Information</h2>
        <TextField label="Email" variant="outlined" fullWidth />
        <TextField label="Phone Number" variant="outlined" fullWidth />

        <h2>Location</h2>
        <TextField label="Location" variant="outlined" fullWidth />

        <h2>Services</h2>
        <TextField label="Service Name" variant="outlined" fullWidth />
        <TextField label="Service Cost ($)" variant="outlined" fullWidth />
        <Button variant="contained" fullWidth>Add Another Service</Button>

        <h2>Availability</h2>
        {/* Add your availability component here */}

        <Button variant="contained" fullWidth>Save Profile</Button>
        <Button variant="contained" fullWidth>View Profile</Button>
      </form>
    </div>
  );
}
