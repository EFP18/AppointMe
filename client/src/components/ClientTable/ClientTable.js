import React from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  TablePagination,
} from '@mui/material';
// import { GET_CLIENTS } from '../../utils/queries';
// import { useQuery } from '@apollo/client';
import clientData from './client.json';
import AddClientModal from '../AddClientModal';
import button from '../button';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from '../theme';

const handleDelete = clientToDelete => {
  // filter out the client to be deleted
  const newClientData = clientData.filter(
    client => client._id !== clientToDelete._id
  );
  // then you can set your state, or update your data source with newClientData.
};

const addClient = newClient => {
  // do something with newClient, e.g. add it to your data
};

const commonStyle = {
  minWidth: 90,
  style: {
    backgroundColor: colors.white,
    color: colors.primary,
    fontWeight: 'bold',
    fontSize: '20px',
  },
};

const columns = [
  { id: 'firstName', label: 'First Name', ...commonStyle },
  { id: 'lastName', label: 'Last Name', ...commonStyle },
  { id: 'email', label: 'Email', ...commonStyle },
  { id: 'phone', label: 'Phone Number', ...commonStyle },
  { id: 'address', label: 'Address', ...commonStyle },
  { id: 'action', label: 'Notes', ...commonStyle },
  { id: 'delete', label: 'Delete', ...commonStyle },
];

export default function ClientTable({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpen,
}) {
  return (
      <TableContainer
        sx={{
          maxHeight: 440,
          backgroundColor: colors.white,
          borderRadius: '15px',
          margin: '3em 1em',
          width: 'calc(100% - 3em)',
          boxShadow: colors.shadow,
        }}
      >
        <Table>
          <TableHead>
            <TableRow
              sx={{
                backgroundColor: colors.white,
                margin: '0.5em',
                borderRadius: '0.5em',
              }}
            >
              {columns.map(column => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth, ...column.style,  }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(clientData => (
                <TableRow
                  hover
                  role='checkbox'
                  tabIndex={-1}
                  key={clientData._id}
                  sx={{
                    backgroundColor: colors.white,
                    margin: '0.5em',
                    borderRadius: '0.5em',
                    fontSize: '14px',
                  }}
                >
                  {columns.map(column => {
                    const value = clientData[column.id];
                    return (
                      <TableCell key={column.id} align={column.align}>
                        {column.id === 'action' ? (
                          <ThemeProvider theme={button}>
                            <Button
                              variant='contained'
                              onClick={() => handleOpen(clientData)}
                              sx={{ mt: '-0.3em' }}
                            >
                              +
                            </Button>
                          </ThemeProvider>
                        ) : column.id === 'delete' ? (
                          <ThemeProvider theme={button}>
                            <Button
                              variant='contained'
                              onClick={() => handleDelete(clientData)}
                              sx={{ mt: '-0.3em' }}
                            >
                              Delete
                            </Button>
                          </ThemeProvider>
                        ) : (
                          value
                        )}
                      </TableCell>
                    );
                  })}
                </TableRow>
              ))}
          </TableBody>
        </Table>
        <TablePagination
          rowsPerPageOptions={[10, 25, 100]}
          component='div'
          count={clientData.length}
          rowsPerPage={rowsPerPage}
          page={page}
          onPageChange={handleChangePage}
          onRowsPerPageChange={handleChangeRowsPerPage}
        />
        <AddClientModal addClient={addClient} />
      </TableContainer>
  );
}
