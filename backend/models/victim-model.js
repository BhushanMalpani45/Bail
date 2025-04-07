const mongoose = require("mongoose");

const victimSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  offense_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Offense",
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

const Victim = mongoose.model("Victim", victimSchema);
module.exports = Victim;
