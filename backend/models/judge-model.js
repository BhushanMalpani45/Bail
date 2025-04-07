import mongoose from "mongoose";
import bcrypt from "bcrypt";

const JudgeSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  court_name: { type: String, required: true },
  cases_reviewed: [
    { type: mongoose.Schema.Types.ObjectId, ref: "BailApplication" },
  ],
  precedents_set: [{ type: mongoose.Schema.Types.ObjectId, ref: "Precedent" }],
});

// Pre-save hook to hash the password before saving the judge
JudgeSchema.pre("save", async function (next) {
  const judge = this;

  // Hash the password only if it has been modified (or is new)
  if (!judge.isModified("password")) return next();

  try {
    // Generate salt
    const salt = await bcrypt.genSalt(10);

    // Hash password
    const hashedPassword = await bcrypt.hash(judge.password, salt);

    // Override the plain password with the hashed one
    judge.password = hashedPassword;
    next();
  } catch (err) {
    return next(err);
  }
});

// Method to compare the provided password with the hashed password
JudgeSchema.methods.comparePassword = async function (inputPassword) {
  try {
    const isMatch = await bcrypt.compare(inputPassword, this.password);
    return isMatch;
  } catch (err) {
    throw err;
  }
};

// Create and export the model using the schema
const Judge = mongoose.model("Judge", JudgeSchema);

export default Judge;
