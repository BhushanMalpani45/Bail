const mongoose = require("mongoose");

const JudicialPrecedentSchema = new mongoose.Schema({
  case_name: { type: String, required: true },
  court_name: { type: String, required: true },
  judge_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge",
    required: true,
  },
  date_of_decision: { type: Date, required: true },
  summary: { type: String, required: true },
  legal_provision_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "LegalProvision",
    required: true,
  },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
});

const JudicialPrecedent = mongoose.model(
  "JudicialPrecedent",
  JudicialPrecedentSchema
);

module.exports = JudicialPrecedent;
