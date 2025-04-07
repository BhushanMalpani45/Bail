import {
  loginUndertrialService,
  getAllUnderTrialPrisonersService,
  getPrisonerByNameService,
  getPastRecordsService,
  getPrisonerFamilyBackgroundService,
  uploadDocumentService,
  getCasesByPrisonerIdService,
} from "../services/under-trail-prisoner.service.js";
import { responseFormatter } from "../utils/app.utils.js";
import { ApiStatusCodes, ResponseMessages } from "../enums/app.enums.js";
import Undertrail from "../models/under-trail-prisoner.js";
import Lawyer from "../models/lawyer-model.js";
import { Notification } from "../models/notification-model.js";
import { Appointment } from "../models/appointment-model.js";
import { generateAndDownloadPdf } from "../services/generate-get-pdf.service.js";
import { generateToken } from "../middlewares/auth.js";

/** Function to login Under-trial Prisoner */
export const loginUndertrialController = async (req, res) => {
  try {
    const { email_id, password } = req.body;

    if (!email_id || !password) {
      res.json(
        responseFormatter(
          ApiStatusCodes.BAD_REQUEST,
          false,
          null,
          "Email ID or Password not provided"
        )
      );
      return;
    }

    const undertrialLoginResponse = await loginUndertrialService(
      email_id,
      password
    );

    switch (undertrialLoginResponse.status_code) {
      case ApiStatusCodes.OK:
        const token = generateToken({ email_id });
        console.log(token);
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: false,
          sameSite: "none",
          maxAge: 86400000,
        });

        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            undertrialLoginResponse.data,
            "Under-trial Prisoner logged in successfully"
          )
        );
        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "Under-trial Prisoner not found"
          )
        );
        break;
      case ApiStatusCodes.UNAUTHORIZED:
        res.json(
          responseFormatter(
            ApiStatusCodes.UNAUTHORIZED,
            false,
            null,
            "Invalid credentials"
          )
        );
        break;
      default:
        res.json(
          responseFormatter(
            ApiStatusCodes.INTERNAL_SERVER_ERROR,
            false,
            null,
            "Internal server error"
          )
        );
    }
  } catch (error) {
    res.json(
      responseFormatter(
        ApiStatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        error.message
      )
    );
  }
};

export const getAllUnderTrialPrisonersController = async (req, res) => {
  try {
    const result = await getAllUnderTrialPrisonersService();

    switch (result.status_code) {
      case ApiStatusCodes.OK:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.OK,
              true,
              result.data,
              result.message
            )
          );
      case ApiStatusCodes.DATA_NOT_FOUND:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.DATA_NOT_FOUND,
              false,
              null,
              result.message
            )
          );
      default:
        return res
          .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            responseFormatter(
              ApiStatusCodes.INTERNAL_SERVER_ERROR,
              false,
              null,
              result.message || "An unexpected error occurred"
            )
          );
    }
  } catch (err) {
    console.error("Controller error:", err); // Log the error
    return res
      .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          ApiStatusCodes.INTERNAL_SERVER_ERROR,
          false,
          null,
          err.message || "An unexpected error occurred"
        )
      );
  }
};

export const getPrisonerByNameController = async (req, res) => {
  try {
    const { _id } = req.body;
    if (!_id) {
      return res
        .status(ApiStatusCodes.BAD_REQUEST)
        .json(
          responseFormatter(
            ApiStatusCodes.BAD_REQUEST,
            false,
            null,
            "Prisoner name not provided"
          )
        );
    }
    const result = await getPrisonerByNameService(_id);

    switch (result.status_code) {
      case ApiStatusCodes.OK:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.OK,
              true,
              result.data,
              result.message
            )
          );
      case ApiStatusCodes.DATA_NOT_FOUND:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.DATA_NOT_FOUND,
              false,
              null,
              result.message
            )
          );
      default:
        return res
          .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            responseFormatter(
              ApiStatusCodes.INTERNAL_SERVER_ERROR,
              false,
              null,
              result.message || "An unexpected error occurred"
            )
          );
    }
  } catch (err) {
    return res
      .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          ApiStatusCodes.INTERNAL_SERVER_ERROR,
          false,
          null,
          err.message || "An unexpected error occurred"
        )
      );
  }
};

// Function to get past records of Prisoner //

export const getPastRecordsController = async (req, res) => {
  try {
    const { prisonerId } = req.body;
    //console.log(prisonerId);

    if (!prisonerId) {
      return res
        .status(ApiStatusCodes.BAD_REQUEST)
        .json(
          responseFormatter(
            ApiStatusCodes.BAD_REQUEST,
            false,
            null,
            "Prisoner ID not provided"
          )
        );
    }

    const result = await getPastRecordsService(prisonerId);

    switch (result.status_code) {
      case ApiStatusCodes.OK:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.OK,
              true,
              result.data,
              result.message
            )
          );
      case ApiStatusCodes.DATA_NOT_FOUND:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.DATA_NOT_FOUND,
              false,
              null,
              result.message
            )
          );
      default:
        return res
          .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            responseFormatter(
              ApiStatusCodes.INTERNAL_SERVER_ERROR,
              false,
              null,
              result.message || "An unexpected error occurred"
            )
          );
    }
  } catch (err) {
    return res
      .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          ApiStatusCodes.INTERNAL_SERVER_ERROR,
          false,
          null,
          err.message || "An unexpected error occurred"
        )
      );
  }
};

// Function to get the details of the Family background of Prisoner //

export const getPrisonerFamilyBackgroundController = async (req, res) => {
  try {
    const { prisonerId } = req.body;
    //console.log(prisonerId);

    if (!prisonerId) {
      return res
        .status(ApiStatusCodes.BAD_REQUEST)
        .json(
          responseFormatter(
            ApiStatusCodes.BAD_REQUEST,
            false,
            null,
            "Prisoner ID not provided"
          )
        );
    }

    const result = await getPrisonerFamilyBackgroundService(prisonerId);

    switch (result.status_code) {
      case ApiStatusCodes.OK:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.OK,
              true,
              result.data,
              result.message
            )
          );
      case ApiStatusCodes.DATA_NOT_FOUND:
        return res
          .status(result.status_code)
          .json(
            responseFormatter(
              ApiStatusCodes.DATA_NOT_FOUND,
              false,
              null,
              result.message
            )
          );
      default:
        return res
          .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
          .json(
            responseFormatter(
              ApiStatusCodes.INTERNAL_SERVER_ERROR,
              false,
              null,
              result.message || "An unexpected error occurred"
            )
          );
    }
  } catch (err) {
    return res
      .status(ApiStatusCodes.INTERNAL_SERVER_ERROR)
      .json(
        responseFormatter(
          ApiStatusCodes.INTERNAL_SERVER_ERROR,
          false,
          null,
          err.message || "An unexpected error occurred"
        )
      );
  }
};

// Function to upload the Documents specified by the lawyer  //
export const uploadDocumentController = async (req, res) => {
  const { prisonerId } = req.body;
  console.log(prisonerId);
  const file = req.file;
  console.log(file);

  const response = await uploadDocumentService(file, prisonerId);

  switch (response.statusCode) {
    case 200:
      res.status(200).json({
        success: response.success,
        message: response.message,
        file: response.file,
      });
      break;
    case 400:
      res.status(400).json({
        success: response.success,
        message: response.message,
      });
      break;
    case 500:
    default:
      res.status(500).json({
        success: response.success,
        message: response.message,
        error: response.error,
      });
      break;
  }
};

// Combined function for fetching document metadata and serving document files
export const handleDocumentsController = async (req, res) => {
  const { prisonerId, fileName } = req.body;

  if (fileName) {
    // Serve the document file
    try {
      // Construct the file path based on the fileName
      const filePath = path.join(__dirname, "uploads", "documents", fileName);

      // Check if the file exists
      fs.access(filePath, fs.constants.F_OK, (err) => {
        if (err) {
          return res.status(404).json({
            success: false,
            message: "File not found",
          });
        }

        // Send the file
        res.sendFile(filePath);
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while retrieving the file",
        error: error.message,
      });
    }
  } else if (prisonerId) {
    // Fetch document metadata
    try {
      // Find the prisoner by ID
      const prisoner = await Undertrail.findById(prisonerId);

      if (!prisoner) {
        return res.status(404).json({
          success: false,
          message: "Prisoner not found",
        });
      }

      // Respond with document metadata
      res.status(200).json({
        success: true,
        documents: prisoner.documents,
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: "An error occurred while fetching documents",
        error: error.message,
      });
    }
  } else {
    res.status(400).json({
      success: false,
      message: "Missing parameters",
    });
  }
};

// Function to book an Apointmennt of Lawyer //
export const bookAppointmentController = async (req, res) => {
  try {
    const { prisonerId, lawyerId, date } = req.body;
    console.log(prisonerId, lawyerId);

    // Find the lawyer
    const lawyer = await Lawyer.findById(lawyerId);
    if (!lawyer) {
      return res
        .status(404)
        .json({ success: false, message: "Lawyer not found" });
    }

    // Find the prisoner
    const prisoner = await Undertrail.findById(prisonerId);
    if (!prisoner) {
      return res
        .status(404)
        .json({ success: false, message: "Prisoner not found" });
    }

    // Create an appointment
    const appointment = new Appointment({
      prisoner: prisonerId,
      lawyer: lawyerId,
      date,
    });

    await appointment.save();

    // Create a notification for the lawyer
    const notification = new Notification({
      lawyer: lawyerId,
      prisoner: prisonerId,
      message: `Prisoner ${prisoner.name} has requested you to handle their case.`,
    });

    await notification.save();

    // Respond with success
    return res.status(201).json({
      success: true,
      message: "Appointment booked and notification sent to the lawyer.",
      appointment,
    });
  } catch (error) {
    console.error(error);
    return res
      .status(500)
      .json({ success: false, message: "Server Error", error });
  }
};

// function to download and get the generated pdf //
export async function handleGeneratePdfRequest(req, res) {
  try {
    await generateAndDownloadPdf();
    res.status(200).json({ message: "PDF generated and saved successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error generating PDF.", error: error.message });
  }
}

// function to get the case details by Prisoner ID //
export const getCasesByPrisonerIdController = async (req, res) => {
  try {
    const { prisonerId } = req.body;
    // console.log(prisonerId);
    console.log("yayaya");
    const response = await getCasesByPrisonerIdService(prisonerId);
    console.log(response);

    res.status(response.status_code).json(response);
  } catch (error) {
    console.error("Error in getCasesByPrisonerIdController:", error.message);
    res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: "Internal server error",
    });
  }
};
export const verifyTokenController = (req, res) => {
  // If the middleware passes, the token is valid
  res.status(200).json({
    message: "Token is valid",
    user: req.user, // The decoded user information from the token
  });
};
