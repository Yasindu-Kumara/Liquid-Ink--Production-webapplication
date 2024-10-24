const Express = require("express");
const app = Express();
const records = require("./MongoDB/Mongo");
const cors = require("cors");
require("dotenv").config();
const dayjs = require("dayjs");
const customParseFormat = require("dayjs/plugin/customParseFormat");
dayjs.extend(customParseFormat);

app.use(Express.json());
app.use(Express.urlencoded({ extended: true }));
app.use(cors());

const port = process.env.PORT || 8000;

app.get("/", async (req, res) => {
  const requestedDate = req.query.date;
  const searchdata = await records.find({ Date: requestedDate });
  res.send(searchdata);
});

app.post("/", async (req, res) => {
  const {
    jobId,
    itemCode,
    inQty,
    outQty,
    group,
    machineValue,
    employeeValue,
    selectedDate,
    onTime,
    offTime,
  } = req.body.newRecord;

  const data = {
    JobId: jobId,
    ItemCode: itemCode,
    InQty: inQty,
    OutQty: outQty,
    group: group,
    Machine: machineValue,
    EmployeeID: employeeValue,
    Date: selectedDate,
    OnTime: onTime,
    OffTime: offTime,
  };

  try {
    await records.insertMany([data]);
    res.json("success");
  } catch (e) {
    console.log(e);
    res.json("failed");
  }
});

app.put("/update/:jobId", async (req, res) => {
  const jobId = req.params.jobId;
  const updatedRecord = req.body;

  try {
    const updatedData = {
      JobId: updatedRecord.jobId,
      ItemCode: updatedRecord.itemCode,
      InQty: updatedRecord.inQty,
      OutQty: updatedRecord.outQty,
      group: updatedRecord.group,
      Machine: updatedRecord.machineValue,
      EmployeeID: updatedRecord.employeeValue,
      Date: updatedRecord.selectedDate,
      OnTime: updatedRecord.onTime,
      OffTime: updatedRecord.offTime,
    };

    const result = await records.updateOne(
      { _id: jobId },
      { $set: updatedData }
    );

    if (result.modifiedCount === 1) {
      res.json("Record updated successfully");
    } else {
      res.json("No record found to update");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Failed to update record");
  }
});

app.delete("/delete/:jobId", async (req, res) => {
  const jobId = req.params.jobId;

  try {
    const result = await records.deleteOne({ _id: jobId });

    if (result.deletedCount === 1) {
      res.json("Record deleted successfully");
    } else {
      res.json("No record found to delete");
    }
  } catch (e) {
    console.log(e);
    res.status(500).json("Failed to delete record");
  }
});

app.listen(port, () => {
  console.log("Server is Start port 8000");
});
