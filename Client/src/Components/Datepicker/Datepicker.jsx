import React from "react";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import "dayjs/locale/en";

dayjs.extend(customParseFormat);

const Datepicker = (props) => {
  const today = dayjs().format("DD/MM/YYYY");

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs} adapterLocale="en">
      <DemoContainer components={["DatePicker"]}>
        <DatePicker
          label="Select Date"
          name="selectedDate"
          value={props.currentDate}
          onChange={props.onChange}
          format="DD/MM/YYYY"
        />
      </DemoContainer>
    </LocalizationProvider>
  );
};

export default Datepicker;
