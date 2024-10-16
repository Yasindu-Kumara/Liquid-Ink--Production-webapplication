const mongoose = require("mongoose");
require("dotenv").config();

const mongodb_api_key = process.env.MONGODB_KEY;

const url = `mongodb+srv://yasithkalum2587:${mongodb_api_key}@liquidinkproduction.qhf8t.mongodb.net/?retryWrites=true&w=majority&appName=LiquidInkProduction`;

mongoose
  .connect(url)
  .then(() => {
    console.info("connected to the db");
  })
  .catch((e) => {
    console.log("error", e);
  });

const recordSchema = new mongoose.Schema({
  JobId: { type: String, required: true },
  ItemCode: { type: String, required: true },
  InQty: { type: Number, required: true },
  OutQty: { type: Number, required: true },
  group: { type: String, required: true },
  Machine: { type: String, required: true },
  EmployeeID: { type: String, required: true },
  Date: { type: String, required: true },
  OnTime: { type: String, required: true },
  OffTime: { type: String, required: true },
});

module.exports = mongoose.model("Record", recordSchema);
