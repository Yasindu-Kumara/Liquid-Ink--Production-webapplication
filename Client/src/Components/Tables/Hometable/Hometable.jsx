import React, { useState } from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import {
  IconButton,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";
import axios from "axios";
import Updatedialogbox from "../../Updatedialogbox/Updatedialogbox";

const columns = [
  { width: 50, label: "Job Id", dataKey: "JobId" },
  { width: 110, label: "Item Code", dataKey: "ItemCode", numeric: true },
  { width: 105, label: "In Qty", dataKey: "InQty", numeric: true },
  { width: 105, label: "Out Qty", dataKey: "OutQty", numeric: true },
  { width: 110, label: "Group", dataKey: "group", numeric: true },
  { width: 110, label: "Machine", dataKey: "Machine", numeric: true },
  { width: 100, label: "Emp ID", dataKey: "EmployeeID", numeric: true },
  { width: 110, label: "On Time", dataKey: "OnTime", numeric: true },
  { width: 110, label: "Off Time", dataKey: "OffTime", numeric: true },
  { width: 110, label: "Action", dataKey: "action", numeric: false },
];

const Hometable = (props) => {
  const [selectedRow, setSelectedRow] = useState(null);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isDeleteDialogOpen, setIsDeleteDialogOpen] = useState(false);

  const [rowToDelete, setRowToDelete] = useState(null);

  const handleEditClick = (row) => {
    setSelectedRow(row);
    setIsEditDialogOpen(true);
  };

  const handleDeleteClick = (row) => {
    setRowToDelete(row);
    setIsDeleteDialogOpen(true);
  };

  const handleConfirmDelete = async () => {
    try {
      await axios.delete(`http://localhost:8000/delete/${rowToDelete._id}`);
      setIsDeleteDialogOpen(false);
      props.onDelete(rowToDelete._id);
      window.location.reload();
    } catch (error) {
      alert("Error deleting the record.");
      console.error(error);
    }
  };

  const handleUpdate = (updatedData) => {
    props.onUpdate(updatedData);
    setIsEditDialogOpen(false);
  };

  const rowContent = (_index, row) => {
    const currentDate = dayjs().format("DD/MM/YYYY");
    const isSameDate = currentDate === row.Date;

    return (
      <>
        {columns.map((column) => (
          <TableCell key={column.dataKey} align="center">
            {column.dataKey === "action" ? (
              <div>
                <IconButton
                  aria-label="edit"
                  color="primary"
                  onClick={() => handleEditClick(row)}
                  disabled={!isSameDate}
                >
                  <EditIcon />
                </IconButton>
                <IconButton
                  aria-label="delete"
                  color="secondary"
                  onClick={() => handleDeleteClick(row)}
                  disabled={!isSameDate}
                >
                  <DeleteIcon />
                </IconButton>
              </div>
            ) : (
              row[column.dataKey]
            )}
          </TableCell>
        ))}
      </>
    );
  };

  return (
    <Paper style={{ marginTop: "20px", height: 350, width: "100%" }}>
      <TableVirtuoso
        data={props.data}
        components={{
          Scroller: TableContainer,
          Table,
          TableHead,
          TableRow,
          TableBody,
        }}
        fixedHeaderContent={() => (
          <TableRow>
            {columns.map((column) => (
              <TableCell
                key={column.dataKey}
                variant="head"
                align="center"
                style={{ width: column.width }}
              >
                {column.label}
              </TableCell>
            ))}
          </TableRow>
        )}
        itemContent={rowContent}
      />

      {selectedRow && (
        <Updatedialogbox
          open={isEditDialogOpen}
          onClose={() => setIsEditDialogOpen(false)}
          data={selectedRow}
          onUpdate={handleUpdate}
        />
      )}

      <Dialog
        open={isDeleteDialogOpen}
        onClose={() => setIsDeleteDialogOpen(false)}
      >
        <DialogTitle>Delete Row</DialogTitle>
        <DialogContent>
          <DialogContentText>Do you want to delete this row?</DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setIsDeleteDialogOpen(false)}>Cancel</Button>
          <Button onClick={handleConfirmDelete} color="secondary">
            OK
          </Button>
        </DialogActions>
      </Dialog>
    </Paper>
  );
};

export default Hometable;
