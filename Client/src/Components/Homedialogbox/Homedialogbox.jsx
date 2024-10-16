import React, { useState } from "react";
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
import { codes, groups, machine, employees } from "./Selectdata";
import axios from "axios";

dayjs.extend(customParseFormat);

const Homedialogbox = (props) => {
  const [newRecord, setnewRecord] = useState({
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

  const handleTimeChange = (newTime, field) => {
    setnewRecord((prevState) => ({
      ...prevState,
      [field]: newTime,
    }));
  };

  const handleDateChange = (newDate) => {
    setnewRecord((prevState) => ({
      ...prevState,
      selectedDate: newDate,
    }));
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setnewRecord({ ...newRecord, [name]: value });
  };

  const handleCreateNewRecord = async () => {
    try {
      const formattedDate = dayjs(newRecord.selectedDate).format("DD/MM/YYYY");
      const formattedonTime = dayjs(newRecord.onTime).format('HH:mm');
      const formattedoffTime = dayjs(newRecord.offTime).format('HH:mm');

      const recordToSend = {
        ...newRecord,
        onTime: formattedonTime,
        offTime: formattedoffTime,
        selectedDate: formattedDate,
      };

      await axios.post("http://localhost:8000/", {
        newRecord: recordToSend,
      });

      setnewRecord({
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

      props.onClose();
    } catch (e) {
      alert("Error");
      console.log(e);
    }
  };

  return (
    <div>
      <Dialog open={props.open} onClose={props.onClose} fullWidth maxWidth="sm">
        <DialogTitle variant="h4" align="center">
          New Job Details
        </DialogTitle>
        <DialogContent>
          <Grid2 container spacing={2} sx={{ mt: "5px" }}>
            <Grid2 size={6}>
              <TextField
                id="outlined-basic"
                label="Job Id"
                variant="outlined"
                name="jobId"
                value={newRecord.jobId}
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
                  value={newRecord.itemCode}
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
              <TextField
                id="outlined-basic"
                label="In Qty"
                variant="outlined"
                name="inQty"
                value={newRecord.inQty}
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
                value={newRecord.outQty}
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
                  value={newRecord.group}
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
                  value={newRecord.machineValue}
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
            <Grid2 size={6}>
              <FormControl fullWidth>
                <InputLabel id="demo-simple-select-label">
                  Employee ID
                </InputLabel>
                <Select
                  labelId="employee-label"
                  id="employee"
                  name="employeeValue"
                  value={newRecord.employeeValue}
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
                currentDate={newRecord.selectedDate}
                onChange={handleDateChange}
              />
            </Grid2>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <Grid2 size={6}>
                <TimePicker
                  label="On Time"
                  name="onTime"
                  value={newRecord.onTime}
                  onChange={(newTime) => handleTimeChange(newTime, "onTime")}
                />
              </Grid2>
              <Grid2 size={6}>
                <TimePicker
                  label="Off Time"
                  name="offTime"
                  value={newRecord.offTime}
                  onChange={(newTime) => handleTimeChange(newTime, "offTime")}
                />
              </Grid2>
            </LocalizationProvider>
          </Grid2>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCreateNewRecord}>Submit</Button>
          <Button onClick={props.onClose} color="primary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Homedialogbox;
