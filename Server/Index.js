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

const port = process.env.PORT;

app.get("/", async (req, res) => {
  const requestedDate = req.query.date;
  const searchdata = await records.find({ Date: requestedDate });
  res.send(searchdata);
})

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

app.listen(port, () => {
  console.log("Server is Start port 8000");
});
