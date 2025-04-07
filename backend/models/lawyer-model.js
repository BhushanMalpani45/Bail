import mongoose from "mongoose";
import bcrypt from "bcrypt";

const LawyerSchema = new mongoose.Schema({
  name: String,
  email_id: String,
  password: String,
  bar_registration_number: String,
  cases_handled: [{type: mongoose.Schema.Types.ObjectId, ref: 'UndertrialPrisoner'}],
  precedents_used: [mongoose.Schema.Types.ObjectId],
  appliedPrisoners: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "UndertrialPrisoner",
    },
  ],  
  meetings_scheduled: [
    {
      client_name: String,
      meetingDate: Date,
      location: String,
      purpose: String,
      notes: String,
      createdAt: { type: Date, default: Date.now },
    },
  ],
  court_appearances: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "CourtAppearance",
    },
  ],
});

// Pre-save hook to hash the password before saving the lawyer
LawyerSchema.pre("save", async function (next) {
  const lawyer = this;

  // Hash the password only if it has been modified (or is new)
  if (!lawyer.isModified("password")) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(lawyer.password, salt);

    // Override the plain password with the hashed one
    lawyer.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare the provided password with the hashed password
LawyerSchema.methods.comparePassword = async function (inputPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Create and export the model using the schema
const Lawyer = mongoose.model("Lawyer", LawyerSchema);

export default Lawyer;
