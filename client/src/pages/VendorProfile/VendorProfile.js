import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextField,
  Select,
  MenuItem,
  InputLabel,
  FormControl,
  Box,
  Divider,
  Stack,
  IconButton,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from '../../components/theme';
import button from '../../components/button';
import './VendorProfile.css';
import Navbar from '../../components/Navbar/Navbar';
import Page from '../../components/Page';
// temporary seed file for testing
import categoryData from './categorySeeds.json';
// import { GET_TAGS } from '../../utils/queries';
// import { useQuery } from '@apollo/client';

export default function VendorProfile() {
  const [category, setCategory] = React.useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [services, setServices] = useState([{ name: '', cost: '' }]);
  const [businessName, setBusinessName] = useState('');
  const [businessNameError, setBusinessNameError] = useState(false);
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [description, setDescription] = useState('');
  const [descriptionError, setDescriptionError] = useState(false);
  const emailValidation = /.+@.+\..+/;
  const history = useNavigate();
  const navigate = useNavigate();

  const handleFormSubmit = (event, redirect = false) => {
    event.preventDefault();

    // Initialize all error states to false
    setBusinessNameError(false);
    setEmailError(false);
    setDescriptionError(false);

    // Validate business name
    if (businessName === '') {
      setBusinessNameError(true);
    }

    // Validate email
    if (!emailValidation.test(email)) {
      setEmailError(true);
    }

    // Validate description
    if (description.length > 500) {
      setDescriptionError(true);
    }

    // If there are no errors, you can proceed with the form submission
    if (!businessNameError && !emailError && !descriptionError) {
      if (redirect) {
        // Redirect to the profile view page
        navigate('/profileview');
      } else {
        // Add your form submit logic here.
        setIsSaved(true);
      }
    }
  };

  // const {loading, data} = useQuery(GET_TAGS);
  // // either an empty array or data queried with useQuery
  // const categoryData = data?.tags || [];

  const handleChange = event => {
    setCategory(event.target.value);
  };

  const handleServiceChange = (index, event) => {
    const values = [...services];
    if (event.target.name === 'name') {
      values[index].name = event.target.value;
    } else {
      values[index].cost = event.target.value;
    }
    setServices(values);
  };

  const handleAddService = () => {
    const values = [...services];
    values.push({ name: '', cost: '' });
    setServices(values);
  };

  const handleDescriptionChange = event => {
    setDescription(event.target.value);
  };

  return (
    <Page title={'Edit Profile - AppointMe'} className='landing-page'>
      <div style={{ minHeight: '100vh', margin: '100px 10px' }}>
        <Navbar />
        <Box
          sx={{
            margin: '10px 250px',
            flexGrow: 1,
            backgroundColor: colors.white,
          }}
        >
          <h1 style={{ textAlign: 'left' }}>Edit Profile</h1>
          <ThemeProvider theme={button}>
            <Stack
              direction='row'
              alignItems='center'
              justifyContent='space-evenly'
              spacing={2}
            >
              <Box>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='label'
                  sx={{ fontSize: 40 }}
                >
                  <input hidden accept='image/*' type='file' />
                  <PhotoCamera sx={{ fontSize: 40 }} />
                </IconButton>
                <p style={{ textAlign: 'center' }}>Upload Profile Picture</p>
              </Box>
              <Box>
                <IconButton
                  color='primary'
                  aria-label='upload picture'
                  component='label'
                  sx={{ fontSize: 40 }}
                >
                  <input hidden accept='image/*' type='file' />
                  <PhotoCamera sx={{ fontSize: 40 }} />
                </IconButton>
                <p style={{ textAlign: 'center' }}>Upload Background Picture</p>
              </Box>
            </Stack>

            <form onSubmit={handleFormSubmit}>
              <TextField
                label='Business Name'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                value={businessName}
                onChange={event => setBusinessName(event.target.value)}
                error={businessNameError}
                helperText={businessNameError && 'Business name is required'}
              />
              <TextField
                label='Description'
                variant='outlined'
                multiline
                rows={4}
                fullWidth
                margin='normal'
                value={description}
                onChange={handleDescriptionChange}
                helperText={
                  descriptionError
                    ? 'Description cannot exceed 500 characters'
                    : `${description.length}/500`
                }
                error={descriptionError}
              />
              <FormControl fullWidth variant='outlined' margin='normal'>
                <InputLabel id='category-label'>Category *</InputLabel>
                <Select
                  labelId='category-label'
                  value={category}
                  onChange={handleChange}
                  label='Category'
                >
                  {/* dynamically create the different industries/categories */}
                  {/* key returns null */}
                  {categoryData.map(category => {
                    return (
                      <div>
                        <MenuItem key={category.id} value={category.name}>
                          {category.name}
                        </MenuItem>
                      </div>
                    );
                  })}
                </Select>
              </FormControl>
              <TextField
                label='Email'
                variant='outlined'
                fullWidth
                margin='normal'
                required
                value={email}
                onChange={event => setEmail(event.target.value)}
                error={emailError}
                helperText={emailError && 'Must use a valid email address'}
              />
              <TextField
                label='Phone Number'
                variant='outlined'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Address'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='Your address'
              />

              <Divider
                style={{ margin: '30px 0', backgroundColor: colors.black }}
              />

              <h2 style={{ textAlign: 'left' }}>Services</h2>
              {services.map((service, index) => (
                <Stack key={index} direction='row' spacing={2}>
                  <TextField
                    label='Service Name'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    style={{ marginBottom: '0px', flex: 3 }}
                    name='name'
                    value={service.name}
                    onChange={event => handleServiceChange(index, event)}
                  />

                  <Box
                    display='flex'
                    flexDirection='column'
                    alignItems='flex-end'
                    flex={1}
                  >
                    <TextField
                      label='Service Cost ($)'
                      variant='outlined'
                      fullWidth
                      margin='normal'
                      style={{ marginBottom: '0px' }}
                      name='cost'
                      value={service.cost}
                      onChange={event => handleServiceChange(index, event)}
                    />
                    {index === services.length - 1 && (
                      <Button
                        variant='contained'
                        style={{ marginBottom: '0px', alignSelf: 'flex-end' }}
                        onClick={handleAddService}
                      >
                        +
                      </Button>
                    )}
                  </Box>
                </Stack>
              ))}
              <Divider
                style={{ margin: '30px 0', backgroundColor: colors.black }}
              />
              <h2 style={{ textAlign: 'left' }}>Contact Information</h2>

              <Stack direction='row' spacing={2} alignItems='center'>
                <TextField
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
                <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                />
              </Stack>

              <Divider
                style={{ margin: '30px 0', backgroundColor: colors.black }}
              />

              <h2 style={{ textAlign: 'left' }}>Social Links</h2>
              <TextField
                label='Youtube'
                variant='outlined'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Facebook'
                variant='outlined'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Instagram'
                variant='outlined'
                fullWidth
                margin='normal'
              />
              <TextField
                label='Linkedin'
                variant='outlined'
                fullWidth
                margin='normal'
              />
              <TextField
                label='TikTok'
                variant='outlined'
                fullWidth
                margin='normal'
              />

              <Stack
                direction='row'
                spacing={2}
                alignItems='baseline'
                justifyContent='center'
              >
                <Button
                  type='submit'
                  variant='contained'
                  style={{ marginTop: '30px', marginBottom: '0px' }}
                >
                  Save Profile
                </Button>

                <Button
                  href='/profileview'
                  variant='contained'
                  style={{ marginBottom: '0px' }}
                  onClick={(event) => handleFormSubmit(event, true)}
                >
                  View Profile
                </Button>
              </Stack>
            </form>
          </ThemeProvider>
        </Box>
      </div>
    </Page>
  );
}
