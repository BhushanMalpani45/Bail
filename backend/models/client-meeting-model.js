import mongoose from "mongoose";

const clientMeetingSchema = new mongoose.Schema({
  lawyer: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Lawyer",
    required: true,
  },
  client: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  meetingDate: { type: Date, required: true },
  location: { type: String, required: true },
  purpose: { type: String, required: true }, // e.g., "Client Meeting" or "Court Appearance"
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

const ClientMeeting = mongoose.model(
  "ClientMeeting",
  clientMeetingSchema,
  "client_meetings"
);
export default ClientMeeting;
