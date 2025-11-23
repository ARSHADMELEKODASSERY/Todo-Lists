import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import IconButton from "@mui/material/IconButton";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import AddIcon from "@mui/icons-material/Add";
import Button from "@mui/material/Button";
import ConfirmDialog from "./ConfirmDialogue";
import Pagination from "@mui/material/Pagination";

const TodoLists = ({ todos, handleOpenDrawer, handleEditOpen, handleDeleteConfirm, confirmOpen, setConfirmOpen, selectedId, setSelectedId }) => {
  const [page, setPage] = useState(1);
  const rowsPerPage = 5;

  const handlePageChange = (event, value) => {
    setPage(value);
  };

  const handleDeleteClick = (id) => {
    setSelectedId(id);
    setConfirmOpen(true);
  };

const getStatusChip = (status) => {
  const getBackgroundColor = () => {
    switch (status) {
      case "Pending": return "#ecf7ff";
      case "Completed": return "#ecf6f0";
      case "In-Progress": return "#fff4e5";
      default: return "#ecf7ff";
    }
  };

  const getTextColor = () => {
    switch (status) {
      case "Pending": return "#429fd7";
      case "Completed": return "#0F8741";
      case "In-Progress": return "rgb(255,152,0)";
      default: return "#429fd7";
    }
  };

  return (
    <div
      style={{
        backgroundColor: getBackgroundColor(),
        color: getTextColor(),
        fontSize: "12px",
        height: "28px",
        width: "fit-content",
        maxWidth: "120px",
        borderRadius: "50px",
        overflow: "hidden",
        display: "flex",
        alignItems: "center",
        justifyContent: "flex-start",
        padding: "0 10px",
        whiteSpace: "nowrap",
        textOverflow: "ellipsis",
        fontWeight: 600,
      }}
    >
      <span
        style={{
          display: "inline-block",
          width: "6px",
          height: "6px",
          borderRadius: "50%",
          marginRight: "6px",
          backgroundColor: getTextColor(),
        }}
      ></span>
      {status}
    </div>
  );
};

  return (
    <Container-fluid>
      {/* Add Button */}
      <div
        className="mb-3"
        style={{
          display: "flex",
          justifyContent: "flex-end",
          marginRight: "10px",
        }}
      >
        <Button
          variant="contained"
          startIcon={<AddIcon />}
          onClick={handleOpenDrawer}
          sx={{ textTransform: "capitalize" }}
        >
          Add Todo
        </Button>
      </div>

      <TableContainer component={Paper} className="mx-2">
        <Table sx={{ minWidth: 650, borderTop: "1px solid #e0e0e0", marginTop: "20px" }} aria-label="simple table mt-2">
          <TableHead>
            <TableRow>
              <TableCell sx={{ fontWeight: 600 }}>Sl.No</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Title</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Description</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Status</TableCell>
              <TableCell sx={{ fontWeight: 600 }}>Actions</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {todos
              .slice((page - 1) * rowsPerPage, page * rowsPerPage)
              .map((row, index) => (
                <TableRow key={row._id}>
                  <TableCell component="th" scope="row">
                    {/* {index + 1} */}
                    {(page - 1) * rowsPerPage + index + 1}
                  </TableCell>
                  <TableCell>{row.title}</TableCell>
                  <TableCell>{row.description}</TableCell>
                  <TableCell>{getStatusChip(row.status)}</TableCell>
                  <TableCell>
                    <IconButton
                      color="primary"
                      onClick={() => handleEditOpen(row)}
                      aria-label="edit"
                    >
                      <EditIcon />
                    </IconButton>

                    <IconButton
                      color="error"
                      onClick={() => handleDeleteClick(row._id)}
                      aria-label="delete"
                    >
                      <DeleteIcon />
                    </IconButton>
                  </TableCell>
                </TableRow>
              ))}
          </TableBody>
        </Table>
      </TableContainer>

      {/* Pagination */}
      <div
        style={{ display: "flex", justifyContent: "center", marginTop: "16px" }}
      >
        <Pagination
          count={Math.ceil(todos.length / rowsPerPage)}
          page={page}
          onChange={handlePageChange}
          color="primary"
        />
      </div>

      {/* Confirmation Dialog */}
      <ConfirmDialog
        open={confirmOpen}
        title="Delete Todo"
        message="Are you sure you want to delete this To-Do item?"
        onConfirm={handleDeleteConfirm}
        onClose={() => setConfirmOpen(false)}
      />
    </Container-fluid>
  );
};

export default TodoLists;
