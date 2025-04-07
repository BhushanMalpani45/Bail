const mongoose = require("mongoose");

const hearingScheduleSchema = new mongoose.Schema({
  bail_application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BailApplication",
    required: true,
  },
  court_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Court",
    required: true,
  },
  hearing_date: {
    type: Date,
    required: true,
  },
  status: {
    type: String,
    enum: ["Scheduled", "Completed", "Postponed", "Cancelled"],
    default: "Scheduled",
  },
  notes: {
    type: String,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

const HearingSchedule = mongoose.model(
  "HearingSchedule",
  hearingScheduleSchema
);
module.exports = HearingSchedule;
