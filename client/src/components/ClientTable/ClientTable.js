import React from "react";
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
} from "@mui/material";

const columns = [
  { id: "name", label: "Name", minWidth: 170 },
  { id: "email", label: "Email", minWidth: 170 },
  { id: "number", label: "Phone Number", minWidth: 170 },
  { id: "address", label: "Address", minWidth: 170 },
  { id: "action", label: "Notes", minWidth: 170 },
];

function createData(name, email, number, address, notes = "") {
  return { name, email, number, address, notes };
}

const rows = [
  createData(
    "Client 1",
    "test@aol.com",
    "(555) 555-5555",
    "1234 Mary Ln. Pleasantville, KD"
  ),
  createData(
    "Client 2",
    "test@yahoo.com",
    "(123) 555-5555",
    "954 Mary Ln. Pleasantville, KD"
  ),
  createData(
    "Client 3",
    "test@hotmail.com",
    "(915) 555-5555",
    "2156 Mary Ln. Pleasantville, KD"
  ),
  createData(
    "Client 4",
    "test@gmail.com",
    "(654) 555-5555",
    "5965 Mary Ln. Pleasantville, KD"
  ),
];

export default function ClientTable({
  page,
  rowsPerPage,
  handleChangePage,
  handleChangeRowsPerPage,
  handleOpen,
}) {
  return (
    <Paper sx={{ width: "100%", overflow: "hidden" }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map(column => (
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
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map(row => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.name}>
                    {columns.map(column => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.id === "action" ? (
                            <Button
                              variant="contained"
                              color="primary"
                              onClick={() => handleOpen(row)}
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
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}

export { rows };

