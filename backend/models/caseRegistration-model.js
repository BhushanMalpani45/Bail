import mongoose from "mongoose";
// import bcrypt from "bcrypt";

// All-in-one Case Registration Schema
const CaseRegistrationSchema = new mongoose.Schema({
  // 1. Case Information
  caseInformation: {
    caseId: { 
      type: String, 
      required: true, 
      unique: true,
    },
    crimeTitle: { type: String, required: true },
    crimeDescription: { type: String, required: true },
    crimeDate: { type: Date, required: true },
    crimeTime: { type: String, required: true },
    crimeLocation: {
      address: { type: String, required: true },
      district: { type: String, required: true },
      state: { type: String, required: true },
      pincode: { type: String },
      policeStation: { type: String, required: true }
    },
    firNumber: { type: String, required: true },
    firDate: { type: Date, required: true },
    sections: [{
      actName: { type: String, required: true }, // e.g., "IPC", "NDPS Act"
      sectionNumbers: [{ type: String, required: true }] // e.g., ["302", "34"]
    }],
    caseType: { 
      type: String, 
      enum: ['Criminal', 'Civil', 'Juvenile', 'POCSO', 'Other'],
      required: true
    },
    caseStatus: { 
      type: String, 
      enum: ['Investigation', 'Chargesheet Filed', 'Under Trial', 'Judgment Delivered', 'Appeal', 'Closed'],
      required: true,
      default: 'Investigation'
    },
    policeReport: { type: String },
    previousCourtActions: { type: String }
  },

  // 2. Parties Involved
  partiesInvolved: {
    // Accused Details
    accused: [{
      name: { type: String, required: true },
      fatherName: { type: String },
      gender: { type: String, required: true },
      age: { type: Number, required: true },
      idType: { 
        type: String,
        enum: ['Aadhar', 'PAN', 'Voter ID', 'Passport', 'Driving License', 'Other'],
        required: true
      },
      idNumber: { type: String, required: true },
      address: { type: String, required: true },
      contactDetails: {
        phone: { type: String },
        email: { type: String }
      },
      custodyStatus: {
        type: String,
        enum: ['Not Arrested', 'Police Custody', 'Judicial Custody', 'Released on Bail', 'Absconding'],
        default: 'Not Arrested'
      },
      prisonerDetails: {
        prisonId: { type: String },
        currentCustodyType: {
          type: String,
          enum: ['Police Custody', 'Judicial Custody']
        },
        dateOfArrest: { type: Date },
        familyBackground: {
          fatherName: { type: String },
          motherName: { type: String },
          maritalStatus: { type: String }
        },
        pastRecords: [{
          caseDescription: { type: String },
          status: { type: String },
          courtName: { type: String },
          sentenceDuration: { type: String }
        }]
      }
    }],

    // Victim Details
    victims: [{
      name: { type: String, required: true },
      gender: { type: String },
      age: { type: Number },
      address: { type: String, required: true },
      contactDetails: {
        phone: { type: String },
        email: { type: String }
      },
      injuries: { type: String },
      statement: { type: String },
      isMinor: { type: Boolean, default: false },
      guardianDetails: {
        name: { type: String },
        relationship: { type: String },
        contactNumber: { type: String }
      },
      confidentialityRequired: { type: Boolean, default: false }
    }],

  },


  // 4. Evidence Documentation
  evidenceDocumentation: {
    physicalEvidence: [{
      description: { type: String },
      collectionDate: { type: Date },
      collectionLocation: { type: String },
      custodianName: { type: String }
    }],
    documentaryEvidence: [{
      description: { type: String },
      documentType: { type: String },
      relevance: { type: String }
    }],
    digitalEvidence: [{
      description: { type: String },
      source: { type: String },
      mediaType: { type: String }
    }],
    statements: [{
      givenBy: { type: String },
      role: { type: String },
      statementDate: { type: Date },
      summary: { type: String }
    }],
    medicalReports: [{
      reportType: { type: String },
      doctorName: { type: String },
      hospitalName: { type: String },
      reportDate: { type: Date },
      findings: { type: String }
    }],
    firCopy: {
      stationFileNumber: { type: String },
      filedBy: { type: String },
      officerInCharge: { type: String }
    },
    attachments: [{
      fileName: { type: String },
      fileType: { type: String },
      uploadDate: { type: Date, default: Date.now },
      description: { type: String },
      // In a real system, you'd store a reference or path to file storage
      filePath: { type: String }
    }]
  },

});

// Create the model using the schema
const CaseRegistration = mongoose.model("CaseRegistration", CaseRegistrationSchema);
export default CaseRegistration;