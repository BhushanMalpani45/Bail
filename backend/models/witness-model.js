const mongoose = require("mongoose");

const witnessSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  statement: {
    type: String,
    required: true,
  },
  contact_info: {
    type: String,
    required: true,
  },
  prisoner_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "UndertrialPrisoner",
    required: true,
  },
  lawyer_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: false,
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

const Witness = mongoose.model("Witness", witnessSchema);
module.exports = Witness;
