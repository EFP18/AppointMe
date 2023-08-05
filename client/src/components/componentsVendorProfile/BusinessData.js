// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { v4 as uuidv4 } from 'uuid';
// import {
//   Button,
//   TextField,
//   Select,
//   MenuItem,
//   InputLabel,
//   FormControl,
//   Box,
//   Divider,
//   Stack,
//   IconButton,
//   Container,
//   Grid,
// } from '@mui/material';
// import PhotoCamera from '@mui/icons-material/PhotoCamera';
// import { ThemeProvider } from '@mui/material/styles';
// import { colors } from '../../components/theme';
// import button from '../../components/button';
// import '../../pages/VendorProfile/VendorProfile.css';
// import Navbar from '../../components/Navbar/Navbar';
// import Page from '../../components/Page';
// // // temporary seed file for testing
// // import categoryData from './categorySeeds.json';
// // import { GET_TAGS } from '../../utils/queries';
// import { GET_VENDOR } from '../../utils/queries';
// import { ADD_BUSINESS, UPD_BUSINESS } from '../../utils/mutation';
// import { useMutation } from '@apollo/client';
// import { useQuery } from '@apollo/client';

// export default function BusinessData() {
//   const [isSaved, setIsSaved] = useState(false);

//   const [business, setBusiness] = useState({
//     name: '',
//     description: '',
//     logo: '',
//     image: '',
//     address: '',
//     phone: '',
//     email: '',
//   });

//   const [businessNameError, setBusinessNameError] = useState(false);
//   const [emailError, setEmailError] = useState(false);
//   const [descriptionError, setDescriptionError] = useState(false);
//   const emailValidation = /.+@.+\..+/;

//   const [updateBusiness, { loading: mutationLoading, error: mutationError }] =
//     useMutation(UPD_BUSINESS);
//   const [addBusiness] = useMutation(ADD_BUSINESS);

//   const handleFormSubmit = async (event, redirect = false) => {
//     event.preventDefault();

//     // Initialize all error states to false
//     setBusinessNameError(false);
//     setEmailError(false);
//     setDescriptionError(false);

//     // Validate business name
//     if (business.name === '') {
//       setBusinessNameError(true);
//     }

//     // Validate email
//     if (!emailValidation.test(business.email)) {
//       setEmailError(true);
//     }

//     // Validate description
//     if (businessDescription.length > 500) {
//       setDescriptionError(true);
//     }

//     // If there are no errors, you can proceed with the form submission
//     if (!businessNameError && !emailError && !descriptionError) {
//       const variables = {
//         name: business.name,
//         description: business.description,
//         logo: business.logo,
//         image: business.image,
//         address: business.address,
//         phone: business.phone,
//         email: business.email,
//       };
//       try {
//         // Call the updateBusiness mutation and pass the variables
//         if (!data) {
//           await addBusiness({ variables });
//         } else {
//           await updateBusiness({ variables });
//         }

//         // If the mutation is successful, you can proceed with the form submission
//         setIsSaved(true);
//         if (redirect) {
//           // Redirect to the profile view page and reload page to update data
//           window.location.replace('/profileview');
//         }
//       } catch (err) {
//         console.error('Error updating business:', err);
//       }
//     }
//   };
//   const { loading, data } = useQuery(GET_VENDOR);

//   const businessData = data?.vendor?.business || {};
//   const businessDescription = businessData?.description || '';

//   useEffect(() => {
//     if (!data) return;

//     setBusiness({
//       name: businessData.name,
//       description: businessData.description,
//       logo: businessData.logo,
//       image: businessData.image,
//       address: businessData.address,
//       phone: businessData.phone,
//       email: businessData.email,
//     });
//   }, [data]);

//   const handleBusinessChange = (event) => {
//     // name of field being updated
//     const name = event.target.name;
//     // value: input from keyboard on field
//     //[] for a variable
//     setBusiness({ ...business, [name]: event.target.value });
//   };
//   return (
//     <>
//       {/* <form onSubmit={handleFormSubmit}> */}
//         <TextField
//           label='Business Name'
//           variant='outlined'
//           fullWidth
//           margin='normal'
//           required
//           value={business.name}
//           name='name'
//           onChange={handleBusinessChange}
//           error={businessNameError}
//           helperText={businessNameError && 'Business name is required'}
//         />
//         <TextField
//           label='Description'
//           variant='outlined'
//           multiline
//           rows={4}
//           fullWidth
//           margin='normal'
//           value={business.description}
//           name='description'
//           onChange={handleBusinessChange}
//           helperText={
//             descriptionError
//               ? 'Description cannot exceed 500 characters'
//               : `${businessDescription.length}/500`
//           }
//           error={descriptionError}
//         />

// <TextField
//                 label='Email'
//                 variant='outlined'
//                 fullWidth
//                 margin='normal'
//                 required
//                 value={business.email}
//                 name='email'
//                 onChange={handleBusinessChange}
//                 error={emailError}
//                 helperText={emailError && 'Must use a valid email address'}
//               />
//               <TextField
//                 label='Phone Number'
//                 variant='outlined'
//                 fullWidth
//                 margin='normal'
//                 value={business.phone}
//                 name='phone'
//                 onChange={handleBusinessChange}
//               />
//               <TextField
//                 label='Address'
//                 variant='outlined'
//                 fullWidth
//                 margin='normal'
//                 placeholder='Your address'
//                 value={business.address}
//                 name='address'
//                 onChange={handleBusinessChange}
//               />


//       {/* </form> */}
//     </>
//   );
// }
