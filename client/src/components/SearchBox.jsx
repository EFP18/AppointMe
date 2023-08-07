import * as React from 'react';
import { useState, useEffect } from 'react';
import { TextField, Autocomplete, Typography } from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
// import services from '../data/services';
import { Link } from 'react-router-dom';
import { colors } from '../components/theme';
import categoryData from '../pages/VendorProfile/categorySeeds.json';

const GroupItems = styled('ul')({
  padding: 0,
});

export default function SearchBox({ details, onSelect }) {
  const theme = useTheme();
  const options = categoryData.map(option => {
    const firstLetter = option.name[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  // initialize the value of inputText using useState
  const [inputText, setInputText] = useState('');
  const [labelText, setLabelText] = useState('Business')

  useEffect(() => {
    if (inputText) {
      setLabelText('')
    } else {
      setLabelText('Business')
    }
  }, [inputText])

  const handleSearch = e => {
    setInputText(e.target.value);
  };

  return (
    <Autocomplete
      id='grouped-demo'
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={option => option.firstLetter}
      getOptionLabel={option => option.name}
      sx={{
        width: 300,
        '& .MuiOutlinedInput-root': {
          borderRadius: 0,
          '& fieldset': {
            borderColor: 'transparent',
          },
          '&:hover fieldset': {
            borderColor: 'transparent',
          },
          '&.Mui-focused fieldset': {
            borderColor: 'transparent',
          },
        },
        color: colors.black,
        fontFamily: 'League Spartan',
        fontSize: '24px',
      }}
      renderInput={params => (
        <TextField
          {...params}
          label={labelText}
          onChange={event => handleSearch(event)}
          InputProps={{
            ...params.InputProps,
            style: {
              borderBottom: `1px solid ${colors.black}`,
              paddingRight: '50px',
              fontFamily: 'League Spartan',
              fontSize: '16px',

            },
          }}
          InputLabelProps={{
            shrink: true,
            style: {
              fontSize: '50px',
              paddingTop: '15px',
              fontFamily: 'League Spartan',
            },
          }}
          variant='outlined'
        />
      )}
      // Call the onSelect function when a service is selected
      onChange={(event, value) => {
        if (value) {
          onSelect(value.name);
        }
      }}
      // Use Link component for navigation when a service is selected
      renderOption={(props, option) => (
        <Link
          to={`/services/${option.name}`}
          style={{ textDecoration: 'none' }}
          {...props}
        >
          <Typography
            style={{
              fontFamily: 'League Spartan',
              fontSize: '20px',
              color: colors.black,
              backgroundColor: colors.white,
              fontWeight: 'bolder',
            }}
          >
            {option.name}
          </Typography>
        </Link>
      )}
      renderGroup={params => (
        <li key={params.key}>
          <Box
            sx={{
              position: 'sticky',
              top: '-8px',
              padding: '4px 10px',
              color: colors.black,
              backgroundColor: colors.secondary,
              fontFamily: 'League Spartan',
              fontSize: '20px',
              fontWeight: 'bolder',
            }}
          >
            {params.group}
          </Box>

          <GroupItems>{params.children}</GroupItems>
        </li>
      )}
    />
  );
}
