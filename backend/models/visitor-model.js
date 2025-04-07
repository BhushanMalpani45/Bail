import mongoose from "mongoose";
import bcrypt from "bcrypt";

const VisitorSchema = new mongoose.Schema({
  name: { type: String, required: true },
  email_id: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role:{type:String, enum:["visitor","admin"]}
  // Additional fields can be added based on the visitor's interaction with the site
});

const Visitor = mongoose.model("Visitor", VisitorSchema);

export default Visitor;
