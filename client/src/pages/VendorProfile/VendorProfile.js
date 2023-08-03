import React, { useState, useEffect } from 'react';
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
import { GET_BUSINESS, GET_VENDOR } from '../../utils/queries';
import {
  ADD_BUSINESS,
  UPD_BUSINESS,
  UPD_VENDOR,
  ADD_TAG,
  RMV_TAG,
  ADD_SERVICE,
  DEL_SERVICE,
  UPD_SERVICE,
  UPD_SOCIALMEDIA,
} from '../../utils/mutation';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';

export default function VendorProfile() {
  const [category, setCategory] = useState('');
  const [isSaved, setIsSaved] = useState(false);
  const [business, setBusiness] = useState({
    name: '',
    description: '',
    logo: '',
    image: '',
    address: '',
    phone: '',
    email: '',
  });
  const [vendor, setVendor] = useState({
    firstName: '',
    lastName: '',
  });
  const [service, setService] = useState({
    name: '',
    price: 0.0,
    description: '',
  });
  const [social, setSocial] = useState({
    facebook: '',
    instagram: '',
    youTube: '',
    tikTok: '',
    linkedIn: '',
  });
  const [isLoading, setLoading] = useState(true);
  const [businessNameError, setBusinessNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const emailValidation = /.+@.+\..+/;
  const history = useNavigate();
  const navigate = useNavigate();
  const [updateBusiness, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPD_BUSINESS);

  const handleFormSubmit = async (event, redirect = false) => {
    event.preventDefault();

    // Initialize all error states to false
    setBusinessNameError(false);
    setEmailError(false);
    setDescriptionError(false);

    // Validate business name
    if (business.name === '') {
      setBusinessNameError(true);
    }

    // Validate email
    if (!emailValidation.test(business.email)) {
      setEmailError(true);
    }

    // Validate description
    if (businessDescription.length > 500) {
      setDescriptionError(true);
    }

    // If there are no errors, you can proceed with the form submission
    if (!businessNameError && !emailError && !descriptionError) {
      const variables = {
        businessId: business.id,
        name: business.name,
        description: business.description,
        // add other business properties here...
      };
      try {
        // Call the updateBusiness mutation and pass the variables
        await updateBusiness({ variables });

        // If the mutation is successful, you can proceed with the form submission
        setIsSaved(true);
        if (redirect) {
          // Redirect to the profile view page
          navigate('/profileview');
        }
      } catch (err) {
        console.error('Error updating business:', err);
      }
    }
  };

  // const {loading, data} = useQuery(GET_TAGS);
  // // either an empty array or data queried with useQuery
  // const categoryData = data?.tags || [];

  const { loading, data } = useQuery(GET_BUSINESS);
  const businessData = data?.business || {};
  const servicesArr = businessData?.services || [];
  const socialObj = businessData?.socialMedia || {};
  const businessDescription = businessData?.description || '';
  // setBusiness(businessData);

  useEffect(() => {
    setBusiness(businessData);
    setSocial(socialObj);
    setLoading(false);
  }, [data]);

  // const [addBusiness]

  const handleChange = (event) => {
    const selectedCategory = event.target.value;
    setCategory(selectedCategory);
    setBusiness({ ...business, category: selectedCategory });
  };

  const handleServiceChange = (event) => {
    const name = event.target.name;
    setService({ [name]: event.target.value });
  };

  const handleAddService = () => {
    const values = [...business.services];
    values.push({ name: '', cost: '' });
    setService(values);
  };

  const handleBusinessChange = (event) => {
    // name of field being updated
    const name = event.target.name;
    // value: input from keyboard
    //[] for a variable
    setBusiness({ [name]: event.target.value });
  };

  const handleSocial = (event) => {
    const name = event.target.name;
    setSocial({ [name]: event.target.value });
  };

  const handleVendor = (event) => {
    const name = event.target.name;
    setVendor({ [name]: event.target.value });
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
                value={business.name}
                name='name'
                onChange={handleBusinessChange}
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
                value={business.description}
                name='description'
                onChange={handleBusinessChange}
                helperText={
                  descriptionError
                    ? 'Description cannot exceed 500 characters'
                    : `${businessDescription.length}/500`
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
                  {categoryData.map((category) => {
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
                value={business.email}
                name='email'
                onChange={handleBusinessChange}
                error={emailError}
                helperText={emailError && 'Must use a valid email address'}
              />
              <TextField
                label='Phone Number'
                variant='outlined'
                fullWidth
                margin='normal'
                value={business.phone}
                name='phone'
                onChange={handleBusinessChange}
              />
              <TextField
                label='Address'
                variant='outlined'
                fullWidth
                margin='normal'
                placeholder='Your address'
                value={business.address}
                name='address'
                onChange={handleBusinessChange}
              />

              <Divider
                style={{ margin: '30px 0', backgroundColor: colors.black }}
              />

              <h2 style={{ textAlign: 'left' }}>Services</h2>
              {servicesArr.map((service, index) => (
                <Stack key={index} direction='row' spacing={2}>
                  <TextField
                    label='Service Name'
                    variant='outlined'
                    fullWidth
                    margin='normal'
                    style={{ marginBottom: '0px', flex: 3 }}
                    name='name'
                    value={service.name}
                    onChange={(event) => handleServiceChange(index, event)}
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
                      name='price'
                      value={service.price}
                      onChange={(event) => handleServiceChange(index, event)}
                    />
                    {index === servicesArr.length - 1 && (
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
                  name='firstName'
                  value={vendor.firstName}
                  onChange={handleVendor}
                />
                <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
                  margin='normal'
                  name='lastName'
                  value={vendor.lastName}
                  onChange={handleVendor}
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
                onChange={handleSocial}
                name='youTube'
                value={social.youTube}
              />
              <TextField
                label='Facebook'
                variant='outlined'
                fullWidth
                margin='normal'
                onChange={handleSocial}
                name='facebook'
                value={social.facebook}
              />
              <TextField
                label='Instagram'
                variant='outlined'
                fullWidth
                margin='normal'
                onChange={handleSocial}
                name='instagram'
                value={social.instagram}
              />
              <TextField
                label='Linkedin'
                variant='outlined'
                fullWidth
                margin='normal'
                onChange={handleSocial}
                name='linkedIn'
                value={social.linkedIn}
              />
              <TextField
                label='TikTok'
                variant='outlined'
                fullWidth
                margin='normal'
                onChange={handleSocial}
                name='tikTok'
                value={social.tikTok}
              />

              <Stack
                direction='row'
                spacing={2}
                alignItems='baseline'
                justifyContent='center'
              >
                {/* <Button
                  type='submit'
                  variant='contained'
                  style={{ marginTop: '30px', marginBottom: '0px' }}
                >
                  Save Profile
                </Button> */}

                <Button
                  href='/profileview'
                  variant='contained'
                  style={{ marginBottom: '0px' }}
                  onClick={(event) => handleFormSubmit(event, true)}
                >
                  Save Profile
                </Button>
              </Stack>
            </form>
          </ThemeProvider>
        </Box>
      </div>
    </Page>
  );
}
