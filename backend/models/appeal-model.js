const mongoose = require("mongoose");

const appealSchema = new mongoose.Schema({
  bail_application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BailApplication",
    required: true,
  },
  appeal_date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Pending", "Approved", "Rejected"],
    default: "Pending",
  },
  reason_for_appeal: {
    type: String,
    required: true,
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

const Appeal = mongoose.model("Appeal", appealSchema);
module.exports = Appeal;
