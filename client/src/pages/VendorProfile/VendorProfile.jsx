import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { v4 as uuidv4 } from 'uuid';
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
  Container,
  Grid,
} from '@mui/material';
import PhotoCamera from '@mui/icons-material/PhotoCamera';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from '../../components/theme';
import button from '../../components/button';
import './VendorProfile.css';
import Navbar from '../../components/Navbar/Navbar';
import Page from '../../components/Page';
import { GET_TAGS, GET_VENDOR } from '../../utils/queries';
import {
  ADD_BUSINESS,
  UPD_BUSINESS,
  UPD_VENDOR,
  ADD_TAG,
  ADD_SERVICE,
  DEL_SERVICE,
  UPD_SERVICE,
  UPD_SOCIALMEDIA,
  MANAGE_SERVICES,
} from '../../utils/mutation';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { margin } from '@mui/system';

const DisplayServices = ({
  serviceObj,
  handleEditServiceObj,
  deleteService,
  handleEditServiceError
}) => {
  const arr = [];

  for (const serviceId in serviceObj) {
    const service = serviceObj[serviceId].data;

    const elm = (
      <Stack
        key={service._id}
        direction='row'
        spacing={2}
        alignItems='center'
        sx={{ marginBottom: '15px' }}
      >
        <TextField
          label='Service Name'
          variant='outlined'
          fullWidth
          style={{ marginBottom: '0px', flex: 3 }}
          name='name'
          value={service.name}
          onChange={(e) => handleEditServiceObj(e, service._id, serviceObj)}
        />

        <Stack direction='column' spacing={1} alignItems='flex-end' flex={1}>
          <TextField
            label='Service Cost ($)'
            variant='outlined'
            fullWidth
            style={{ marginBottom: '0px' }}
            name='price'
            value={service.price}
            onChange={(e) => handleEditServiceObj(e, service._id, serviceObj)}
            onBlur={(e) => handleEditServiceError(e)}
          />
        </Stack>
        <Button
          variant='contained'
          color='secondary'
          name={service._id}
          key={service._id}
          onClick={deleteService}
        >
          Delete
        </Button>
      </Stack>
    );

    arr.push(elm);
  }
  return arr;
};

export default function VendorProfile() {
  // useState
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
  const [serviceObj, setServiceObj] = useState({});
  // 'someId': {
  // 'unaltered', 'edited', 'deleted', 'new'
  //   type: '',
  //   data: {
  //     _id: '',
  //     name: '',
  //     price: 0.0,
  //     description: '',
  //   }
  // }
  const [social, setSocial] = useState({
    facebook: '',
    instagram: '',
    youTube: '',
    tikTok: '',
    linkedIn: '',
  });
  const [isLoading, setLoading] = useState(true);

  // Error handling
  const [businessNameError, setBusinessNameError] = useState(false);
  const [emailError, setEmailError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const [priceError, setPriceError] = useState(false)
  const emailValidation = /.+@.+\..+/;
  const history = useNavigate();
  const navigate = useNavigate();

  // Mutations
  const [updateBusiness, { loading: mutationLoading, error: mutationError }] =
    useMutation(UPD_BUSINESS);
  const [addBusiness] = useMutation(ADD_BUSINESS);
  const [manageServices] = useMutation(MANAGE_SERVICES);
  const [updSocialMedia] = useMutation(UPD_SOCIALMEDIA);
  const [updVendor] = useMutation(UPD_VENDOR);
  const [addTag] = useMutation(ADD_TAG);
  const [DelService] = useMutation(DEL_SERVICE);

  const deleteService = async (e) => {
    await DelService({
      variables: { id: e.target.name },
    });
    refetch();
  };

  // Service
  const handleAddServiceObj = () => {
    const _id = uuidv4();
    setServiceObj({
      ...serviceObj,
      [_id]: {
        type: 'new',
        data: {
          _id,
          name: '',
          price: 0.0,
          description: '',
        },
      },
    });
  };

  const handleEditServiceObj = (e, _id, serviceObj) => {
    const { name, value } = e.target;

    const thisService = {
      ...serviceObj[_id],
    };

    setServiceObj({
      ...serviceObj,
      [_id]: {
        type: thisService.type === 'new' ? 'new' : 'edited',
        data: {
          ...thisService.data,
          [name]: value,
        },
      },
    });
  };

  const handleEditServiceError = (e) => {
    const { name, value } = e.target;

    console.log(name)

    if (name === 'price') {
      const pricePattern = /^\d+\.\d{2}$/; // checks to see if the inputted value has exactly 2 decimal points
      const isValidPrice = pricePattern.test(value)
      if (!isValidPrice) {
        setPriceError(value)
      } else {
        setPriceError(false)
      }
    }
  };

  // Save profile handling
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
        name: business.name,
        description: business.description,
        logo: business.logo,
        image: business.image,
        address: business.address,
        phone: business.phone,
        email: business.email,
      };

      const socialVariables = {
        facebook: social.facebook || '',
        instagram: social.instagram || '',
        linkedIn: social.linkedIn || '',
        tikTok: social.tikTok || '',
        youTube: social.youTube || '',
      };

      const vendorVariables = {
        firstName: vendor.firstName,
        lastName: vendor.lastName,
      };

      // Service handling
      const servicesArr = Object.values(serviceObj);

      const convertFloat = (obj) => {
        obj.data.price = parseFloat(obj.data.price);
      };

      servicesArr.forEach(convertFloat);

      // console.log(servicesArr);
      try {
        await manageServices({
          variables: {
            servicesArr: servicesArr,
          },
        });
        // Call the updateBusiness mutation and pass the variables
        if (!data.vendor.business) {
          await addBusiness({ variables });
          await updSocialMedia({ variables: socialVariables });
          await updVendor({ variables: vendorVariables });
          await addTag({ variables: { id: category } });
        } else {
          await updateBusiness({ variables });
          await updSocialMedia({ variables: socialVariables });
          await updVendor({ variables: vendorVariables });
          // this is the equivalent of updatedBusiness from addTag mutation
          await addTag({ variables: { id: category } });
        }

        // If the mutation is successful, you can proceed with the form submission
        setIsSaved(true);
        if (redirect) {
          // Redirect to the profile view page and reload page to update data
          window.location.replace('/profileview');
        }
      } catch (err) {
        console.error('Error updating business:', err);
      }
    }
  };

  // Queries
  const { loading, data, refetch } = useQuery(GET_VENDOR);
  const { loading: tagsLoading, data: tags } = useQuery(GET_TAGS);
  const tagsData = tags?.tags || [];
  const businessData = data?.vendor?.business || {};
  const businessTagData = businessData?.tags?._id || '';
  const socialObj = businessData?.socialMedia || {};
  const businessDescription = businessData?.description || '';
  const vendorData = data?.vendor || {};

  useEffect(() => {
    if (!data) return;
    const servicesObj = {};
    businessData?.services?.forEach(({ _id, name, price, description }) => {
      servicesObj[_id] = {
        type: 'unaltered',
        data: {
          _id,
          name,
          price,
          description,
        },
      };
    });
    setServiceObj(servicesObj);

    setBusiness({
      name: businessData.name,
      description: businessData.description,
      logo: businessData.logo,
      image: businessData.image,
      address: businessData.address,
      phone: businessData.phone,
      email: businessData.email,
    });
    setSocial(socialObj);
    setLoading(false);
    setVendor({
      firstName: vendorData.firstName,
      lastName: vendorData.lastName,
    });
    setCategory(businessTagData);
  }, [data]);

  const handleChange = (event) => {
    // selected category returns the ID of the service
    const selectedCategoryId = event.target.value;
    setCategory(selectedCategoryId);
    // grab the name of the tag through the id

    setBusiness({ ...business, category: selectedCategoryId });
  };

  const handleBusinessChange = (event) => {
    // name of field being updated
    const name = event.target.name;
    // value: input from keyboard on field
    //[] for a variable
    setBusiness({ ...business, [name]: event.target.value });
  };

  const handleSocial = (event) => {
    const name = event.target.name;
    setSocial({ ...social, [name]: event.target.value });
  };

  const handleVendor = (event) => {
    const name = event.target.name;
    setVendor({ ...vendor, [name]: event.target.value });
  };

  return (
    <Page title={'Edit Profile - AppointMe'} className='landing-page'>
      <Container>
        <Navbar />

        <Box
          sx={{
            margin: '10px 0',
            marginLeft: '90px',
            padding: '20px',
            borderRadius: '15px',
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
                  {tagsData.map((category) => {
                    return (
                      <MenuItem key={category._id} value={category._id}>
                        {category.name}

                        {/* attribute for menuitem  */}
                        {/* selected={category.name ? selected= "true": selected="false"} */}
                      </MenuItem>
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

              <div>
                <h2 style={{ textAlign: 'left' }}>Services</h2>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                  <DisplayServices
                    serviceObj={serviceObj}
                    handleEditServiceObj={handleEditServiceObj}
                    handleEditServiceError={handleEditServiceError}
                    deleteService={deleteService}
                  />
                  {priceError && <p style={{ color: 'red', textAlign: 'left', fontWeight: 'bold' }}>Invalid Price Format ({priceError})</p>}
                </div>
                <Button
                  variant='contained'
                  style={{ marginBottom: '0px', alignSelf: 'flex-end' }}
                  onClick={handleAddServiceObj}
                >
                  +
                </Button>
              </div>

              <Divider
                style={{ margin: '30px 0', backgroundColor: colors.black }}
              />
              <h2 style={{ textAlign: 'left' }}>Contact Information</h2>

              <Stack direction='row' spacing={2} alignItems='center'>
                <TextField
                  label='First Name'
                  variant='outlined'
                  fullWidth
                  name='firstName'
                  value={vendor.firstName}
                  onChange={handleVendor}
                />
                <TextField
                  label='Last Name'
                  variant='outlined'
                  fullWidth
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
      </Container>
    </Page>
  );
}