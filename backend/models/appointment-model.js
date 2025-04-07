import mongoose from "mongoose";

const appointmentSchema = new mongoose.Schema(
  {
    prisoner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UnderTrailPrisoner",
      required: true,
    },
    lawyer: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Lawyer",
      required: true,
    },
    date: { type: Date, required: true },

    status: { type: String, default: "Pending" }, // e.g., Pending, Confirmed, Rejected
  },
  { timestamps: true }
);

export const Appointment = mongoose.model("Appointment", appointmentSchema);
