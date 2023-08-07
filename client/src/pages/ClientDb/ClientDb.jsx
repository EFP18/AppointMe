import React, { useState, useEffect } from 'react';
import ClientModal from '../../components/ClientModal/ClientModal';
import ClientTable from '../../components/ClientTable/ClientTable';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/material';
import { useMutation, useQuery } from '@apollo/client'
import { GET_BUSINESS } from '../../utils/queries'
import { UPD_CLIENT } from '../../utils/mutation'
import './ClientDb.css';
import Page from '../../components/Page';

export default function ClientDb() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState('');
  const [saveNote] = useMutation(UPD_CLIENT)



  const [clients, setClients] = useState([]);

  const { loading, data, refetch } = useQuery(GET_BUSINESS)
  const clientsData = data?.business.clients || [];


  useEffect(() => {
    if (!data) return;
    setClients(clientsData)
  }, [data])


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(event.target.value);
    setPage(0);
  };

  const handleOpen = (client) => {
    setSelectedClient(client);
    setNote(client.note);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = async (event) => {
    const id = selectedClient._id

    const updObj = {
      ...selectedClient,
      note: note,
      id: id
    }
    
    delete updObj._id

    await saveNote({
      variables: updObj
    });
    refetch();
    setEditMode(false);
  };

  const handleNoteChange = (event) => {
    setNote(event.target.value);
  };

  return (
    <Page title={'My Clients - AppointMe'} className='landing-page'>
        <div sx={{ display: 'flex' }}>
          <Navbar />
          <Box sx={{ marginLeft: '100px', flexGrow: 1 }}>
            <ClientTable
              page={page}
              rowsPerPage={rowsPerPage}
              handleChangePage={handleChangePage}
              handleChangeRowsPerPage={handleChangeRowsPerPage}
              handleOpen={handleOpen}
              clients={clients}
              refetch={refetch}
            />
            <ClientModal
              open={open}
              handleClose={handleClose}
              selectedClient={selectedClient}
              handleEdit={handleEdit}
              handleSave={handleSave}
              editMode={editMode}
              handleNoteChange={handleNoteChange}
              notes={note}
            />
          </Box>
        </div>

    </Page>
  );
}
