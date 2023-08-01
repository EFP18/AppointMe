import React from 'react';
import {
  Paper,
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

const columns = [
  { id: 'firstName', label: 'First Name', minWidth: 170 },
  { id: 'lastName', label: 'Last Name', minWidth: 170 },
  { id: 'email', label: 'Email', minWidth: 170 },
  { id: 'phone', label: 'Phone Number', minWidth: 170 },
  { id: 'address', label: 'Address', minWidth: 170 },
  { id: 'note', label: 'Notes', minWidth: 170 },
];

export default function ClientTable({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpen,
}) {
  // const { loading, data } = useQuery(GET_CLIENTS);
  // const clientData = data?.clients || [];

  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label='sticky table'>
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {clientData
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((clientData) => {
                return (
                  <TableRow
                    hover
                    role='checkbox'
                    tabIndex={-1}
                    key={clientData._id}
                  >
                    {columns.map((column) => {
                      const value = clientData[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === 'action' ? (
                            <Button
                              variant='contained'
                              color='primary'
                              onClick={() => handleOpen(clientData)}
                            >
                              +
                            </Button>
                          ) : (
                            value
                          )}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component='div'
        count={clientData.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export { ClientTable };
