const mongoose = require("mongoose");

const projectSchema = {
  shiftDate: { type: Date, required: true },
  startTime: { type: String, required: true },
  endTime: { type: String, required: true },
  store: { type: String, required: true },
  location: { type: String, required: true },
  yourName: { type: String },
  yourPhone: { type: String },
};

const mongooseSchema = new mongoose.Schema(projectSchema);

module.exports = mongoose.model("Shift", mongooseSchema);
