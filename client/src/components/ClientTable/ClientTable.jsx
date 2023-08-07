import { useMutation } from '@apollo/client'
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
import AddClientModal from '../AddClientModal';
import button from '../button';
import { ThemeProvider } from '@mui/material/styles';
import { colors } from '../theme';
import { ADD_CLIENT, DEL_CLIENT } from '../../utils/mutation'

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
  clients,
  refetch
}) {

  const [addNewClient, { loadingNewClient, errorNewClient } ] = useMutation(ADD_CLIENT)
  const [delClient, { loadingDelCl, errorDelCl }] = useMutation(DEL_CLIENT)



  const addClient = async (newClient) => {
    // Add an id to the new client
    try {
      const { data } = await addNewClient({
        variables: newClient
      })
      if (data){
        refetch();
      };
    }catch (err) {
      console.error(err)
    }
  };

  const handleDelete = async (id) => {
  // Add an id to the new client
  try {
    const { data } = await delClient({
      variables: {id}
    })
    if (data){
      refetch();
    };
  }catch (err) {
    console.error(err)
  }
  };
  return (
    <TableContainer
      sx={{
        overflowX: 'auto',
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
              backgroundColor: colors.grey,
              margin: '0.5em',
              borderRadius: '0.5em',
            }}
          >
            {columns.map(column => (
              <TableCell
                key={column.id}
                align={column.align}
                style={{ minWidth: column.minWidth, ...column.style }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        </TableHead>
        <TableBody>
          {clients
            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
            .map(client => (
              <TableRow
                hover
                role='checkbox'
                tabIndex={-1}
                key={client._id}
                sx={{
                  margin: '0.5em',
                  borderRadius: '0.5em',
                  fontSize: '14px',
                }}
              >
                {columns.map(column => {
                  const value = client[column.id];
                  return (
                    <TableCell key={column.id} align={column.align}>
                      {column.id === 'action' ? (
                        <ThemeProvider theme={button}>
                          <Button
                            variant='contained'
                            onClick={() => handleOpen(client)}
                            sx={{ mt: '-0.3em' }}
                          >
                            +
                          </Button>
                        </ThemeProvider>
                      ) : column.id === 'delete' ? (
                        <ThemeProvider theme={button}>
                          <Button
                            variant='contained'
                            onClick={() => handleDelete(client._id)}
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
        count={clients.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
      <AddClientModal addClient={addClient} />
    </TableContainer>
  );
}
