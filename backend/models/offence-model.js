const mongoose = require("mongoose");

const OffenseSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: { type: String, required: true },
  legal_provision_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LegalProvision",
    required: true,
  },
  penalty: { type: String },
  severity: {
    type: String,
    enum: ["Low", "Medium", "High"],
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const Offense = mongoose.model("Offense", OffenseSchema);

module.exports = Offense;
