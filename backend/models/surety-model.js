const mongoose = require("mongoose");

const suretySchema = new mongoose.Schema({
  bail_application_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "BailApplication",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  address: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  assets_pledged: {
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

const Surety = mongoose.model("Surety", suretySchema);
module.exports = Surety;
