import Undertrial from "../models/under-trail-prisoner.js";
import jwt from "jsonwebtoken";
import { ApiStatusCodes, ResponseMessages } from "../enums/app.enums.js";
import { generateToken } from "../middlewares/auth.js";
import { comparePassword } from "../utils/app.utils.js";
import { mongoose } from "mongoose";
import Case from "../models/case-model.js";
// import { Prioritize } from "cloudflare/resources/custom-certificates/prioritize.mjs";

export const loginUndertrialService = async (email_id, password) => {
  try {
    // Find the under-trial prisoner by email_id
    const undertrial = await Undertrial.findOne({ email_id }); // Corrected the query method and object

    if (!undertrial) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Under-trial Prisoner not found",
      };
    }

    const prisonerPassword = undertrial.password;

    // Check if the password is correct
    const isPasswordValid = comparePassword(password, prisonerPassword);
    if (!isPasswordValid) {
      return {
        status_code: ApiStatusCodes.UNAUTHORIZED,
        data: null,
        message: "Invalid password",
      };
    }

    const payload = {
      id: undertrial._id.toString(),
    };

    const token = generateToken(payload);

    return {
      status_code: ApiStatusCodes.OK,
      data: { undertrial, token },
      message: "Under-trial Prisoner logged in successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

/** Service function to get all under-trial prisoners */
export const getAllUnderTrialPrisonersService = async () => {
  try {
    const prisoners = await Undertrial.find({});

    if (!prisoners || prisoners.length === 0) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No under-trial prisoners found",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: prisoners,
      message: "All under-trial prisoners retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

// Service function to get all details of Prisoner by Name //
export const getPrisonerByNameService = async (name) => {
  try {
    const prisoner = await Undertrial.findOne({ name: name });

    if (!prisoner) {
      console.log("No prisoner found");
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Prisoner not found",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: prisoner,
      message: "Prisoner retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};

// Service function to get the past records of Prisoner //
export const getPastRecordsService = async (prisonerId) => {
  try {
    const prisoner = await Undertrial.findById(prisonerId)
      .select("past_records")
      .populate({
        path: "past_records.case_id",
        select: "case_number case_status", // Adjust the fields you want to retrieve
      })
      .exec();

    if (!prisoner) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Prisoner not found",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: prisoner.past_records,
      message: "Past records retrieved successfully",
    };
  } catch (error) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: error.message,
    };
  }
};

// Service function to get the details of the Family Background Of Prisoner //
export const getPrisonerFamilyBackgroundService = async (prisonerId) => {
  console.log(prisonerId);
  try {
    const prisoner = await Undertrial.findById(prisonerId).select(
      "family_background"
    );
    console.log(prisoner);

    if (!prisoner) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        message: "Prisoner not found",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: prisoner.family_background,
      message: "Family background retrieved successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      message: err.message || "An unexpected error occurred",
    };
  }
};

// Service function for the Prisoner to uploads the documents
export const uploadDocumentService = async (file, prisonerId) => {
  try {
    if (!file) {
      return {
        statusCode: 400,
        success: false,
        message: "No file uploaded",
      };
    }

    // Find the prisoner by ID and push the document details
    await Undertrial.findByIdAndUpdate(
      prisonerId,
      {
        $push: {
          documents: {
            fileName: file.filename,
            filePath: file.path,
            uploadDate: new Date(),
          },
        },
      },
      { new: true }
    );

    return {
      statusCode: 200,
      success: true,
      message: "File uploaded and saved successfully",
      file: file,
    };
  } catch (error) {
    return {
      statusCode: 500,
      success: false,
      message: "Server Error",
      error: error.message,
    };
  }
};

export const getCasesByPrisonerIdService = async (prisonerId) => {
  try {
    // Validate the prisonerId format (optional)
    // if (!mongoose.Types.ObjectId.isValid(prisonerId)) {
    //   return {
    //     status_code: ApiStatusCodes.BAD_REQUEST,
    //     data: null,
    //     message: "Invalid prisoner ID format",
    //   };
    // }

    console.log(prisonerId);
    // Find the case based on the prisonerId
    const cases = await Case.findOne({ prisonerId: new mongoose.Types.ObjectId(prisonerId) }).populate('judge').populate('lawyer');
    console.log(cases);

    // Check if any cases were found
    if (!cases || cases.length === 0) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No cases found for this prisoner",
      };
    }

    // Return the cases with a success status code
    return {
      status_code: ApiStatusCodes.OK,
      data: cases,
      message: "Cases retrieved successfully",
    };
  } catch (error) {
    console.error("Error in getCasesByPrisonerIdService:", error.message);
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: "Internal server error",
    };
  }
};
