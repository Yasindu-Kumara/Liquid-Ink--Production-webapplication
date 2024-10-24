import React, { useState, useEffect } from "react";
import {
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  MenuItem,
  Grid2,
  Select,
  InputLabel,
  FormControl,
} from "@mui/material";
import { TimePicker } from "@mui/x-date-pickers/TimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import Datepicker from "../Datepicker/Datepicker";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import {
  codes,
  groups,
  machine,
  employees,
} from "../Homedialogbox/Selectdata.jsx";
import axios from "axios";

dayjs.extend(customParseFormat);

const Updatedialogbox = (props) => {
  const [updatedRecord, setupdatedRecord] = useState({
    jobId: "",
    itemCode: "",
    inQty: "",
    outQty: "",
    group: "",
    machineValue: "",
    employeeValue: "",
    selectedDate: dayjs(),
    onTime: null,
    offTime: null,
  });

  useEffect(() => {
    if (props.data) {
      const parseTime = (timeStr) => {
        const normalizedTimeStr = timeStr ? timeStr.replace(".", ":") : null;
        if (!normalizedTimeStr) return null;

        const baseDate = dayjs().format("YYYY-MM-DD");
        const dateTimeStr = `${baseDate} ${normalizedTimeStr}`;

        return dayjs(dateTimeStr, "YYYY-MM-DD HH:mm");
      };

      setupdatedRecord({
        jobId: props.data.JobId || "",
        itemCode: props.data.ItemCode || "",
        inQty: props.data.InQty || "",
        outQty: props.data.OutQty || "",
        group: props.data.group || "",
        machineValue: props.data.Machine || "",
        employeeValue: props.data.EmployeeID || "",
        selectedDate: dayjs(props.data.Date, "DD/MM/YYYY"),
        onTime: parseTime(props.data.OnTime),
        offTime: parseTime(props.data.OffTime),
      });
    }
  }, [props.data]);

  const handleTimeChange = (newTime, field) => {
    setupdatedRecord((prevState) => ({
      ...prevState,
      [field]: newTime,
    }));
  };

  const handleDateChange = (newDate) => {
    setupdatedRecord((prevState) => ({
      ...prevState,
      selectedDate: newDate,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setupdatedRecord((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateRecord = async () => {
    try {
      const formattedDate = dayjs(updatedRecord.selectedDate).format(
        "DD/MM/YYYY"
      );
      const formattedonTime = dayjs(updatedRecord.onTime).format("HH:mm");
      const formattedoffTime = dayjs(updatedRecord.offTime).format("HH:mm");

      const recordToSend = {
        jobId: updatedRecord.jobId,
        itemCode: updatedRecord.itemCode,
        inQty: updatedRecord.inQty,
        outQty: updatedRecord.outQty,
        group: updatedRecord.group,
        machineValue: updatedRecord.machineValue,
        employeeValue: updatedRecord.employeeValue,
        selectedDate: formattedDate,
        onTime: formattedonTime,
        offTime: formattedoffTime,
      };

      await axios.put(
        `http://localhost:8000/update/${props.data._id}`,
        recordToSend
      );

      props.onClose();
      window.location.reload();
    } catch (e) {
      alert("Error updating the record.");
      console.log(e);
    }
  };

  return (
    <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
      <DialogTitle variant="h4" align="center">
        Edit Job Details
      </DialogTitle>
      <DialogContent>
        <Grid2 container spacing={2} sx={{ mt: "5px" }}>
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="Job Id"
              variant="outlined"
              name="jobId"
              value={updatedRecord.jobId}
              onChange={handleInputChange}
              sx={{ minWidth: "100%" }}
            />
          </Grid2>
          <Grid2 size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Item Code</InputLabel>
              <Select
                labelId="item-code-label"
                id="item-code"
                name="itemCode"
                value={updatedRecord.itemCode}
                onChange={handleInputChange}
                label="Item Code"
              >
                {codes.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Employee ID</InputLabel>
              <Select
                labelId="employee-label"
                id="employee"
                name="employeeValue"
                value={updatedRecord.employeeValue}
                onChange={handleInputChange}
                label="Employee ID"
              >
                {employees.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={6}>
            <Datepicker
              currentDate={updatedRecord.selectedDate}
              onChange={handleDateChange}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="In Qty"
              variant="outlined"
              name="inQty"
              value={updatedRecord.inQty}
              onChange={handleInputChange}
              sx={{ minWidth: "100%" }}
            />
          </Grid2>
          <Grid2 size={6}>
            <TextField
              id="outlined-basic"
              label="Out Qty"
              variant="outlined"
              name="outQty"
              value={updatedRecord.outQty}
              onChange={handleInputChange}
              sx={{ minWidth: "100%" }}
            />
          </Grid2>
          <Grid2 size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Group</InputLabel>
              <Select
                labelId="group-label"
                id="group"
                name="group"
                value={updatedRecord.group}
                onChange={handleInputChange}
                label="Group"
              >
                {groups.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <Grid2 size={6}>
            <FormControl fullWidth>
              <InputLabel id="demo-simple-select-label">Machine</InputLabel>
              <Select
                labelId="machine-label"
                id="machine"
                name="machineValue"
                value={updatedRecord.machineValue}
                onChange={handleInputChange}
                label="Machine"
              >
                {machine.map((option) => (
                  <MenuItem key={option.value} value={option.value}>
                    {option.label}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Grid2>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <Grid2 size={6}>
              <TimePicker
                label="On Time"
                name="onTime"
                value={updatedRecord.onTime}
                onChange={(newTime) => handleTimeChange(newTime, "onTime")}
              />
            </Grid2>
            <Grid2 size={6}>
              <TimePicker
                label="Off Time"
                name="offTime"
                value={updatedRecord.offTime}
                onChange={(newTime) => handleTimeChange(newTime, "offTime")}
              />
            </Grid2>
          </LocalizationProvider>
        </Grid2>
      </DialogContent>
      <DialogActions>
        <Button onClick={handleUpdateRecord}>Update</Button>
        <Button onClick={props.onClose} color="primary">
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default Updatedialogbox;
