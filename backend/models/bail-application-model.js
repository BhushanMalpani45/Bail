const mongoose = require("mongoose");

const BailApplicationSchema = new mongoose.Schema({
  prisoner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UndertrialPrisoner",
    required: true,
  },
  offense_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offense",
    required: true,
  },
  lawyer_id: { type: mongoose.Schema.Types.ObjectId, ref: "Lawyer" },
  judge_id: { type: mongoose.Schema.Types.ObjectId, ref: "Judge" },
  application_date: { type: Date, default: Date.now, required: true },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
    required: true,
  },
  rejection_reason: { type: String },
  hearing_date: { type: Date },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const BailApplication = mongoose.model(
  "BailApplication",
  BailApplicationSchema
);

module.exports = BailApplication;
