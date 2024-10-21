import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";
import { IconButton } from "@mui/material";
import EditIcon from "@mui/icons-material/Edit";
import DeleteIcon from "@mui/icons-material/Delete";
import dayjs from "dayjs";


const columns = [
  {
    width: 50,
    label: "Job Id",
    dataKey: "JobId",
  },
  {
    width: 110,
    label: "Item Code",
    dataKey: "ItemCode",
    numeric: true,
  },
  {
    width: 105,
    label: "In Qty",
    dataKey: "InQty",
    numeric: true,
  },
  {
    width: 105,
    label: "Out Qty",
    dataKey: "OutQty",
    numeric: true,
  },
  {
    width: 110,
    label: "Group",
    dataKey: "group",
    numeric: true,
  },
  {
    width: 110,
    label: "Machine",
    dataKey: "Machine",
    numeric: true,
  },
  {
    width: 100,
    label: "Emp ID",
    dataKey: "EmployeeID",
    numeric: true,
  },
  {
    width: 110,
    label: "Date",
    dataKey: "Date",
    numeric: true,
  },
  {
    width: 110,
    label: "Action",
    dataKey: "action",
    numeric: false,
  },
];

const VirtuosoTableComponents = {
  Scroller: React.forwardRef((props, ref) => (
    <TableContainer component={Paper} {...props} ref={ref} />
  )),
  Table: (props) => (
    <Table
      {...props}
      sx={{ borderCollapse: "separate", tableLayout: "fixed" }}
    />
  ),
  TableHead: React.forwardRef((props, ref) => (
    <TableHead {...props} ref={ref} />
  )),
  TableRow,
  TableBody: React.forwardRef((props, ref) => (
    <TableBody {...props} ref={ref} />
  )),
};

function fixedHeaderContent() {
  return (
    <TableRow>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          variant="head"
          align="center"
          style={{ width: column.width }}
          sx={{ backgroundColor: "background.paper" }}
        >
          {column.label}
        </TableCell>
      ))}
    </TableRow>
  );
}

function rowContent(_index, row) {
  const currentDate = dayjs().format("DD/MM/YYYY"); 
  const isSameDate = currentDate === row.Date; 

  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align="center"
        >
          {column.dataKey === "action" ? (
            <div>
              <IconButton
                aria-label="edit"
                color="primary"
                onClick={() => console.log(`Edit row: ${row.JobId}`)}
                disabled={!isSameDate} 
              >
                <EditIcon />
              </IconButton>
              <IconButton
                aria-label="delete"
                color="secondary"
                onClick={() => console.log(`Delete row: ${row.JobId}`)}
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
}

const Hometable = (props) => {
  return (
    <Paper style={{ marginTop: "20px", height: 350, width: "100%" }}>
      <TableVirtuoso
        data={props.data}
        components={VirtuosoTableComponents}
        fixedHeaderContent={fixedHeaderContent}
        itemContent={rowContent}
      />
    </Paper>
  );
};

export default Hometable;
