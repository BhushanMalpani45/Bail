import mongoose from "mongoose";
import Lawyer from "../models/lawyer-model.js";
import jwt from "jsonwebtoken";
import { ApiStatusCodes, ResponseMessages } from "../enums/app.enums.js";
import { comparePassword } from "../utils/app.utils.js";
import { generateToken } from "../middlewares/auth.js";
import Case from "../models/case-model.js";
import Undertrial from "../models/under-trail-prisoner.js";
import Precedent from "../models/precedents-model.js";
import UndertrialPrisoner from "../models/under-trail-prisoner.js";

export const loginLawyerService = async (email_id, password) => {
  try {
    // Find the lawyer by email_id
    const lawyer = await Lawyer.findOne({ email_id });

    if (!lawyer) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Lawyer not found",
      };
    }

    const lawyerPassword = lawyer.password;

    // Check if the password is correct
    const isPasswordValid = comparePassword(lawyerPassword, password);
    if (!isPasswordValid) {
      return {
        status_code: ApiStatusCodes.BAD_REQUEST,
        data: null,
        message: "Invalid password",
      };
    }

    const payload = {
      id: lawyer._id.toString(),
    };

    const token = generateToken(payload);

    return {
      status_code: ApiStatusCodes.OK,
      data: { lawyer, token },
      message: "Lawyer logged in successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

/** Service to retrieve all Lawyers */
export const getAllLawyersService = async () => {
  try {
    // Retrieve all lawyers from the database
    const lawyers = await Lawyer.find({});

    if (!lawyers || lawyers.length === 0) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No lawyers found",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: lawyers,
      message: "Lawyers retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

/** Service to retrieve a Lawyer by ID */
export const getLawyerByIdService = async (id) => {
  try {
    // Find the lawyer by ID
    const lawyer = await Lawyer.findById(id);
    console.log(lawyer);

    if (!lawyer) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Lawyer not found",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: lawyer,
      message: "Lawyer retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

export const getCasesByLawyerIdService = async (lawyerId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(lawyerId)) {
      return {
        status_code: ApiStatusCodes.BAD_REQUEST,
        data: null,
        message: "Invalid Lawyer ID format",
      };
    }

    const lawyer = await Lawyer.findById(lawyerId);

    if (!lawyer) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Lawyer not found",
      };
    }

    if (!lawyer.cases_handled || lawyer.cases_handled.length === 0) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No cases found for this lawyer",
      };
    }

    // Extract ObjectIds from cases_handled array
    const caseIds = lawyer.cases_handled.map((caseId) => caseId.toString());
    console.log(caseIds);

    // Query UndertrialPrisoner with the extracted ObjectIds
    const cases = await Undertrial.find({ _id: { $in: caseIds } });
    console.log(cases);

    return {
      status_code: ApiStatusCodes.OK,
      data: cases,
      message: "Cases retrieved successfully",
    };
  } catch (err) {
    console.error("Error fetching cases:", err.message);
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: "Internal server error",
    };
  }
};

/** Service function to get all precedents used by a specific lawyer */
export const getPrecedentsByLawyerIdService = async (lawyerId) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(lawyerId)) {
      return {
        status_code: ApiStatusCodes.BAD_REQUEST,
        data: null,
        message: "Invalid Lawyer ID format",
      };
    }

    // Find the lawyer by ID and populate the precedents_used field with full Precedent documents
    const lawyer = await Lawyer.findById(lawyerId).populate({
      path: "precedents_used",
      model: Precedent, // Populate with the Precedent model
      select: "title description dateSet caseReference", // Select relevant fields from Precedent
    });

    if (!lawyer || !lawyer.precedents_used.length) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No precedents found for this lawyer",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: lawyer.precedents_used,
      message: "Precedents retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

// Service function to get the client meeting service //
export const getClientMeetingsService = async (lawyerId) => {
  try {
    // Find the lawyer by ID and select meetings_scheduled
    const lawyer = await Lawyer.findById(lawyerId)
      .select("meetings_scheduled")
      .exec();

    if (!lawyer) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Lawyer not found",
      };
    }

    if (!lawyer.meetings_scheduled || lawyer.meetings_scheduled.length === 0) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No client meetings found for this lawyer",
      };
    }

    const meetingData = lawyer.meetings_scheduled.map((meeting) => ({
      meeting_id: meeting._id, // Use the unique ID of the meeting
      client_name: meeting.client_name, // Extract the client_name from the meeting data
      meetingDate: meeting.meetingDate,
      location: meeting.location,
      purpose: meeting.purpose,
      notes: meeting.notes,
    }));

    return {
      status_code: ApiStatusCodes.OK,
      data: meetingData,
      message: "Client meetings retrieved successfully",
    };
  } catch (err) {
    console.error("Error fetching client meetings:", err); // Added log for errors
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

// Service function to get-court-appearance //
export const getCourtAppearancesService = async (lawyerId) => {
  try {
    // Find the lawyer and populate the court_appearances field
    const lawyer = await Lawyer.findById(lawyerId).populate(
      "court_appearances",
      "caseId clientName location date time"
    );

    if (!lawyer || !lawyer.court_appearances.length) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No court appearances found for this lawyer",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: lawyer.court_appearances,
      message: "Court appearances retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

/** Service function to create a new precedent and associate it with a specific lawyer */
export const addPrecedentToLawyerService = async (lawyerId, precedentData) => {
  try {
    // Find the lawyer by ID
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Lawyer not found",
      };
    }

    // Create a new precedent
    const newPrecedent = new Precedent(precedentData);
    await newPrecedent.save();

    // Add the new precedent's ID to the lawyer's precedents_used array
    lawyer.precedents_used.push(newPrecedent._id);
    await lawyer.save();

    return {
      status_code: ApiStatusCodes.OK,
      data: newPrecedent,
      message: "Precedent created and added to lawyer successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};
/** Service function to add a new client meeting to a lawyer's schedule */
export const addClientMeetingService = async (lawyerId, meetingData) => {
  try {
    // Validate the Lawyer ID
    if (!mongoose.Types.ObjectId.isValid(lawyerId)) {
      return {
        status_code: ApiStatusCodes.BAD_REQUEST,
        data: null,
        message: "Invalid Lawyer ID format",
      };
    }

    // Find the lawyer by ID
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Lawyer not found",
      };
    }

    // Add the new meeting to the lawyer's meetings_scheduled array
    lawyer.meetings_scheduled.push(meetingData);
    await lawyer.save();

    return {
      status_code: ApiStatusCodes.OK,
      data: lawyer.meetings_scheduled,
      message: "Client meeting added successfully",
    };
  } catch (err) {
    console.error("Error adding client meeting:", err);
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

export const applyToLawyerService = async (lawyerId, prisonerId) => {
  try {
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return {
        status_code: 404,
        message: "Lawyer not found",
      };
    }

    // Avoid duplicate entries
    if (!lawyer.appliedPrisoners.includes(prisonerId)) {
      lawyer.appliedPrisoners.push(prisonerId);
      await lawyer.save();
    }

    return {
      status_code: 200,
      message: "Prisoner applied successfully",
    };
  } catch (error) {
    return {
      status_code: 500,
      message: "Server error",
      error: error.message,
    };
  }
};

export const getNotificationsService = async (lawyerId) => {
  try {
    const lawyer = await Lawyer.findById(lawyerId).populate(
      "appliedPrisoners",
      "name email_id"
    );
    if (!lawyer) {
      return {
        status_code: 404,
        message: "Lawyer not found",
      };
    }

    return {
      status_code: 200,
      message: "Applied prisoners fetched successfully",
      data: lawyer.appliedPrisoners,
    };
  } catch (error) {
    return {
      status_code: 500,
      message: "Server error",
      error: error.message,
    };
  }
};

export const handleDecisionService = async (lawyerId, prisonerId, decision) => {
  try {
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return {
        status_code: 404,
        message: "Lawyer not found",
      };
    }

    // Remove prisoner from applied list
    lawyer.appliedPrisoners = lawyer.appliedPrisoners.filter(
      (id) => id.toString() !== prisonerId
    );

    if (decision === "accept") {
      if (!lawyer.cases_handled.includes(prisonerId)) {
        lawyer.cases_handled.push(prisonerId);
      }
    }

    await lawyer.save();

    return {
      status_code: 200,
      message: `Prisoner ${decision}ed successfully`,
    };
  } catch (error) {
    return {
      status_code: 500,
      message: "Server error",
      error: error.message,
    };
  }
};

export const CaseService = {
  getCasesByLawyerId: async (lawyerId) => {
    const cases = await Case.find({ lawyer: lawyerId })
      .populate("prisonerId", "name")
      .populate("judge", "name")
      .populate("lawyer", "name");
    return cases;
  },
};
