import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import { TableVirtuoso } from "react-virtuoso";

const sample = [
  ["Frozen yoghurt", 159, 6.0, 24, 4.0],
  ["Ice cream sandwich", 237, 9.0, 37, 4.3],
  ["Eclair", 262, 16.0, 24, 6.0],
  ["Cupcake", 305, 3.7, 67, 4.3],
  ["Gingerbread", 356, 16.0, 49, 3.9],
];

function createData(id, dessert, calories, fat, carbs, protein) {
  return { id, dessert, calories, fat, carbs, protein };
}

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
    label: "In",
    dataKey: "OnTime",
    numeric: true,
  },
  {
    width: 110,
    label: "Out",
    dataKey: "OffTime",
    numeric: true,
  },
];

const rows = Array.from({ length: 200 }, (_, index) => {
  const randomSelection = sample[Math.floor(Math.random() * sample.length)];
  return createData(index, ...randomSelection);
});

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
          align={column.numeric || false ? "right" : "left"}
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
  return (
    <>
      {columns.map((column) => (
        <TableCell
          key={column.dataKey}
          align={column.numeric || false ? "right" : "left"}
        >
          {row[column.dataKey]} 
        </TableCell>
      ))}
    </>
  );
}

const Hometable = (props) => {
  console.log(props.data);
  return (
    <Paper style={{ marginTop:"20px", height: 350, width: "100%" }}>
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
