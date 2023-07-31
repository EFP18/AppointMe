import * as React from 'react';
import { useState } from 'react';
import { TextField, Autocomplete, Typography } from '@mui/material';
import { styled, lighten, darken } from '@mui/system';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material';
import services from '../data/services';
import { Link } from 'react-router-dom';
import { colors } from '../components/theme';

const GroupItems = styled('ul')({
  padding: 0,
});

export default function SearchBox({ details, onSelect }) {
  const theme = useTheme();
  const options = services.map(option => {
    const firstLetter = option.type[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  // initialize the value of inputText using useState
  const [inputText, setInputText] = useState('');

  const handleSearch = e => {
    setInputText(e.target.value);
    // console.log
  };

  return (
    <Autocomplete
      id='grouped-demo'
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={option => option.firstLetter}
      getOptionLabel={option => option.type}
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
          label='Vendor'
          onKeyPress={event => {
            if (event.key === 'Enter') {
              handleSearch(event);
            }
          }}
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
          onSelect(value.type);
        }
      }}
      // Use Link component for navigation when a service is selected
      renderOption={(props, option) => (
        <Link
          to={`/services/${option.type}`}
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
            {option.type}
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
