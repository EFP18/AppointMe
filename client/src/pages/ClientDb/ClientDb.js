import React, { useState } from 'react';
import ClientModal from '../../components/ClientModal/ClientModal';
import ClientTable, { rows } from '../../components/ClientTable/ClientTable';
import Navbar from '../../components/Navbar/Navbar';
import { Box } from '@mui/material';
import './ClientDb.css';

export default function ClientDb() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);
  const [open, setOpen] = useState(false);
  const [selectedClient, setSelectedClient] = useState(null);
  const [editMode, setEditMode] = useState(false);
  const [note, setNote] = useState('');

  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = event => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  const handleOpen = client => {
    setSelectedClient(client);
    setNote(client.notes);
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleEdit = () => {
    setEditMode(true);
  };

  const handleSave = () => {
    setSelectedClient(prevState => ({
      ...prevState,
      notes: note,
    }));
    setEditMode(false);
  };

  const handleNoteChange = event => {
    setNote(event.target.value);
  };

  return (
    <div sx={{ display: 'flex' }}>
      <Navbar />
      <Box sx={{ marginLeft: '100px', flexGrow: 1 }}>
        <ClientTable
          rows={rows}
          page={page}
          rowsPerPage={rowsPerPage}
          handleChangePage={handleChangePage}
          handleChangeRowsPerPage={handleChangeRowsPerPage}
          handleOpen={handleOpen}
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
  );
}
