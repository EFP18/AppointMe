import * as React from 'react';
import TextField from '@mui/material/TextField';
import Autocomplete from '@mui/material/Autocomplete';
import { styled, lighten, darken } from '@mui/system';
import { useTheme } from '@mui/material';
import { Box } from '@mui/material';

const GroupItems = styled('ul')({
  padding: 0,
});

export default function SearchBox() {
  const theme = useTheme();

  const options = services.map((option) => {
    const firstLetter = option.type[0].toUpperCase();
    return {
      firstLetter: /[0-9]/.test(firstLetter) ? '0-9' : firstLetter,
      ...option,
    };
  });

  return (
    <Autocomplete
      id='grouped-demo'
      options={options.sort(
        (a, b) => -b.firstLetter.localeCompare(a.firstLetter)
      )}
      groupBy={(option) => option.firstLetter}
      getOptionLabel={(option) => option.type}
      sx={{ width: 300 }}
      renderInput={(params) => (
        <TextField {...params} label='With categories' />
      )}
      renderGroup={(params) => (
        <li key={params.key}>
          <Box
            sx={{
              position: 'sticky',
              top: '-8px',
              padding: '4px 10px',
              color: 'primary',
              backgroundColor:
                theme.palette.mode === 'light'
                  ? lighten(theme.palette.primary.light, 0.85)
                  : darken(theme.palette.primary.main, 0.8),
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

const services = [
  { type: 'music' },
  { type: 'landscaping' },
  { type: 'languages' },
];
