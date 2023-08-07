import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button } from "@mui/material";
import './ClientModal.css'
import { colors  } from "../theme";
const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 400,
  bgcolor: "background.paper",
  border: "2px solid #000",
  boxShadow: 24,
  p: 4,
};

export default function ClientModal({
  open,
  handleClose,
  selectedClient,
  handleEdit,
  handleSave,
  editMode,
  handleNoteChange,
  notes,
}) {

  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {selectedClient ? selectedClient.name : "No client selected"}
        </Typography>
        {editMode ? (
          <div>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              label="Notes"
              type="text"
              multiline
              rows={4}
              fullWidth
              value={notes}
              onChange={handleNoteChange}
            />
            <Button onClick={handleSave} sx={{ color: colors.primary}} className='box-button'>
              Save
            </Button>
          </div>
        ) : (
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
            <pre
              id="modal-modal-description"
              sx={{ mt: 2, whiteSpace: "pre-wrap" }}
            >
              {selectedClient ? selectedClient.notes : ""}
            </pre>
            <div id='edited-notes' sx={{ mb: 2, whiteSpace: 'pre-wrap' }}>
              {notes}
            </div>
            <Button
              onClick={handleEdit}
              sx={{ color: colors.primary }}
              className='box-button'
            >
              Edit
            </Button>
          </div>
        )}
      </Box>
    </Modal>
  );
}
