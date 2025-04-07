import mongoose from "mongoose";

const caseSchema = new mongoose.Schema({
  caseId: {
    type: String,
    required: true,
  },
  prisonerId: {
    type: mongoose.Schema.Types.ObjectId, // Changed to ObjectId
    ref: "UndertrialPrisoner", // Reference to the UndertrialPrisoner model
    // required: true,
  },
  address: {
    type: String,
    required: true,
  },
  phone_no: {
    type: Number,
    required: true,
  },
  status: {
    type: Boolean,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  dateFiled: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Open", "Closed", "Pending"],
    default: "Open",
  },
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
  },
  courtName: {
    type: String,
    required: true,
  },
  judge: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Judge",
  },
  legalProvisions: [
    {
      provisionName: { type: String, required: true },
      description: { type: String },
    },
  ],
  hearingDates: [
    {
      date: { type: Date, required: true },
      notes: { type: String },
    },
  ],
  evidence: [
    {
      type: { type: String, required: true },
      description: { type: String },
      filePath: { type: String },
      uploadDate: { type: Date, default: Date.now },
    },
  ],
  verdict: {
    type: String,
    enum: ["Guilty", "Not Guilty", "Pending"],
    default: "Pending",
  },
  sentenceDetails: {
    duration: { type: String },
    type: { type: String },
  },
  comments: [
    {
      commentBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      commentText: { type: String, required: true },
      commentDate: { type: Date, default: Date.now },
    },
  ],
});

const Case = mongoose.model("Case", caseSchema, "cases");

export default Case;
