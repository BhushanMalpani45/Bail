import mongoose from "mongoose";

// Define the Court Appearance schema
const courtAppearanceSchema = new mongoose.Schema({
  caseId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Case", // Reference to a Case model
    required: true,
  },
  clientName: {
    type: String,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  time: {
    type: String, // Format: "HH:mm" or another preferred format
    required: true,
  },
});

// Create a model for the Court Appearance
const CourtAppearance = mongoose.model(
  "CourtAppearance",
  courtAppearanceSchema,
  "court_appearances"
);

export default CourtAppearance;
