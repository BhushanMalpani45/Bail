import mongoose from "mongoose";

const precedentSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateSet: {
    type: Date,
    default: Date.now,
  },
  caseReference: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case", // Optional: Reference to the Case model if needed
  },
});

const Precedent = mongoose.model("Precedent", precedentSchema, "precedents");

export default Precedent;
