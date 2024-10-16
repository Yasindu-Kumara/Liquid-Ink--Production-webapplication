import React, { useState, useEffect } from "react";
import Header from "../Components/Appbar/Header";
import Datepicker from "../Components/Datepicker/Datepicker";
import { Button, Stack } from "@mui/material";
import Hometable from "../Components/Tables/Hometable/Hometable";
import Homedialogbox from "../Components/Homedialogbox/Homedialogbox";
import dayjs from "dayjs";
import customParseFormat from "dayjs/plugin/customParseFormat";
import axios from "axios";

dayjs.extend(customParseFormat);

const Home = () => {
  const [newData, setNewData] = useState();
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

      const response = await axios.get("http://localhost:8000/", {
        params: {
          date: formattedDate,
        },
      });
      setNewData(response.data);
      console.log("Response:", response.data);
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
  }, []);

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
          sx={{
            height: "45px",
            alignSelf: "center",
          }}
        >
          Add New Record
        </Button>
        <Homedialogbox open={openDialog} onClose={handleCloseDialog} />
        <Button
          variant="contained"
          size="medium"
          sx={{
            height: "45px",
            alignSelf: "center",
          }}
        >
          Download Excel File
        </Button>
      </Stack>
      <Hometable data={newData} />
    </div>
  );
};

export default Home;
