import React, { useState, useEffect } from "react";
import Header from "../Components/Appbar/Header";
import Datepicker from "../Components/Datepicker/Datepicker";
import { Button, Stack } from "@mui/material";
import Hometable from "../Components/Tables/Hometable/Hometable";
import Homedialogbox from "../Components/Homedialogbox/Homedialogbox";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";
import * as XLSX from "xlsx";

dayjs.extend(customParseFormat);

const Home = () => {
  const [newData, setNewData] = useState([]);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedDate, setSelectedDate] = useState(dayjs());

  const handleOpenDialog = () => {
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    sendGetRequest(selectedDate);
  };

  const sendGetRequest = async (newDate) => {
    try {
      const formattedDate = dayjs(newDate).format("DD/MM/YYYY");
      const response = await axios.get(
        "https://liquid-ink-production-api.vercel.app/",
        {
          params: { date: formattedDate },
        }
      );
      setNewData(response.data); 
    } catch (error) {
      console.error("Error fetching data:", error);
    }
  };

  const handleDateChange = (newDate) => {
    setSelectedDate(newDate);
    sendGetRequest(newDate);
  };

  useEffect(() => {
    sendGetRequest(selectedDate);
  }, [selectedDate]);

  const handleUpdate = async (updatedRecord) => {
    try {
      await axios.put(
        `https://liquid-ink-production-api.vercel.app/update/${updatedRecord.jobId}`,
        updatedRecord
      );
      setNewData((prevData) =>
        prevData.map((row) =>
          row.JobId === updatedRecord.jobId ? updatedRecord : row
        )
      );
    } catch (error) {
      console.error("Error updating the record:", error);
    }
  };

  const handleDelete = async (jobId) => {
    setNewData((prevData) => prevData.filter((row) => row.JobId !== jobId));
    // try {
    //   await axios.delete(
    //     `https://liquid-ink-production-api.vercel.app/delete/${jobId}`
    //   );
    //   setNewData((prevData) => prevData.filter((row) => row.JobId !== jobId)); // Remove the deleted record
    // } catch (error) {
    //   console.error("Error deleting the record:", error);
    // }
  };

  const downloadExcelFile = () => {
    const worksheetData = newData.map((record) => ({
      "Job ID": record.JobId,
      "Item Code": record.ItemCode,
      "In Qty": record.InQty,
      "Out Qty": record.OutQty,
      Group: record.group,
      Machine: record.Machine,
      "Employee ID": record.EmployeeID,
      Date: record.Date,
      "On Time": record.OnTime,
      "Off Time": record.OffTime,
    }));

    const worksheet = XLSX.utils.json_to_sheet(worksheetData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Records");
    XLSX.writeFile(workbook, "table_data.xlsx");
  };

  return (
    <div>
      <Header />
      <Stack
        direction="row"
        spacing={2}
        alignItems="flex-start"
        sx={{ mt: "100px" }}
      >
        <Datepicker currentDate={selectedDate} onChange={handleDateChange} />

        <Button
          variant="contained"
          size="medium"
          onClick={handleOpenDialog}
          sx={{ height: "45px", alignSelf: "center" }}
        >
          Add New Record
        </Button>

        <Homedialogbox open={openDialog} onClose={handleCloseDialog} />

        <Button
          variant="contained"
          size="medium"
          onClick={downloadExcelFile}
          sx={{ height: "45px", alignSelf: "center" }}
        >
          Download Excel File
        </Button>
      </Stack>

      <Hometable
        data={newData}
        onUpdate={handleUpdate}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default Home;
