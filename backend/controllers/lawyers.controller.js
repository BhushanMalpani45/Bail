import {
  loginLawyerService,
  getAllLawyersService,
  getLawyerByIdService,
  getCasesByLawyerIdService,
  getPrecedentsByLawyerIdService,
  getClientMeetingsService,
  getCourtAppearancesService,
  addPrecedentToLawyerService,
  addClientMeetingService,
  getNotificationsService,
  handleDecisionService,
  CaseService
} from "../services/lawyer.service.js";

import { responseFormatter } from "../utils/app.utils.js";
import { ApiStatusCodes, ResponseMessages } from "../enums/app.enums.js";
import { generateToken } from "../middlewares/auth.js";
import { applyToLawyerService } from "../services/lawyer.service.js";

/* Function to login Lawyer */
export const loginLawyerController = async (req, res) => {
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

    const lawyerLoginResponse = await loginLawyerService(email_id, password);
    console.log(lawyerLoginResponse.status_code);

    switch (lawyerLoginResponse.status_code) {
      case ApiStatusCodes.OK:
        const token = generateToken({ email_id });
        res.cookie("authToken", token, {
          httpOnly: true,
          secure: false,
          sameSite: "Lax",
          maxAge: 86400000,
        });

        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            lawyerLoginResponse.data,
            "Lawyer logged in successfully",
            console.log(lawyerLoginResponse.data)
          )
        );
        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "Lawyer not found"
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

/** Function to retrieve all Lawyers */
export const getAllLawyersController = async (req, res) => {
  try {
    const lawyersResponse = await getAllLawyersService();

    switch (lawyersResponse.status_code) {
      case ApiStatusCodes.OK:
        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            lawyersResponse.data,
            "Lawyers retrieved successfully"
          )
        );
        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "No lawyers found"
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
/** Function to retrieve a Lawyer by ID */
export const getLawyerByIdController = async (req, res) => {
  try {
    const { id } = req.query;

    if (!id) {
      return res.status(400).json({
        success: false,
        message: "Lawyer ID not provided",
      });
    }

    const lawyerResponse = await getLawyerByIdService(id);

    switch (lawyerResponse.status_code) {
      case ApiStatusCodes.OK:
        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            lawyerResponse.data,
            "Lawyer retrieved successfully"
          )
        );
        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "Lawyer not found"
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

// Controller function to get all cases handled by a specific lawyer
export const getCasesByLawyerIdController = async (req, res) => {
  try {
    const { lawyerId } = req.body;
    //console.log(lawyerId);

    if (!lawyerId) {
      res.json(
        responseFormatter(
          ApiStatusCodes.BAD_REQUEST,
          false,
          null,
          "Lawyer ID not provided"
        )
      );
      return;
    }

    const casesResponse = await getCasesByLawyerIdService(lawyerId);

    switch (casesResponse.status_code) {
      case ApiStatusCodes.OK:
        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            casesResponse.data,
            "Cases retrieved successfully"
          )
        );
        console.log(casesResponse);

        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "No cases found for this lawyer"
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

// Controller function to get all precedents used by a specific lawyer
export const getPrecedentsByLawyerIdController = async (req, res) => {
  try {
    const { lawyerId } = req.body;

    if (!lawyerId) {
      res.json(
        responseFormatter(
          ApiStatusCodes.BAD_REQUEST,
          false,
          null,
          "Lawyer ID not provided"
        )
      );
      return;
    }

    const precedentsResponse = await getPrecedentsByLawyerIdService(lawyerId);

    switch (precedentsResponse.status_code) {
      case ApiStatusCodes.OK:
        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            precedentsResponse.data,
            "Precedents retrieved successfully"
          )
        );
        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "No precedents found for this lawyer"
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

/** Function to retrieve all client meetings for a specific lawyer */
export const getClientMeetingsController = async (req, res) => {
  try {
    const { lawyerId } = req.body;

    if (!lawyerId) {
      return res.json(
        responseFormatter(
          ApiStatusCodes.BAD_REQUEST,
          false,
          null,
          "Lawyer ID not provided"
        )
      );
    }

    const meetingsResponse = await getClientMeetingsService(lawyerId);

    switch (meetingsResponse.status_code) {
      case ApiStatusCodes.OK:
        res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            meetingsResponse.data,
            "Client meetings retrieved successfully"
          )
        );
        break;
      case ApiStatusCodes.DATA_NOT_FOUND:
        res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            "No client meetings found for this lawyer"
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

/** Controller function to get all court appearances for a specific lawyer */
export const getCourtAppearancesController = async (req, res) => {
  try {
    const { lawyerId } = req.params;

    const result = await getCourtAppearancesService(lawyerId);

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
              "An unexpected error occurred"
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
          err.message
        )
      );
  }
};
/** Controller function to handle adding a new precedent to a lawyer */
export const addPrecedentToLawyer = async (req, res) => {
  try {
    const { lawyerId, precedent } = req.body;

    // Call the service function to add the precedent
    const result = await addPrecedentToLawyerService(lawyerId, precedent);

    // Return the appropriate response based on the result from the service
    switch (result.status_code) {
      case ApiStatusCodes.OK:
        return res.status(ApiStatusCodes.OK).json({
          message: result.message,
          data: result.data,
        });
      case ApiStatusCodes.BAD_REQUEST:
        return res.status(ApiStatusCodes.BAD_REQUEST).json({
          message: result.message,
        });
      case ApiStatusCodes.DATA_NOT_FOUND:
        return res.status(ApiStatusCodes.NOT_FOUND).json({
          message: result.message,
        });
      case ApiStatusCodes.INTERNAL_SERVER_ERROR:
        return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: result.message,
        });
      default:
        return res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({
          message: "An unexpected error occurred",
        });
    }
  } catch (err) {
    res.status(ApiStatusCodes.INTERNAL_SERVER_ERROR).json({
      message: "Server error",
      error: err.message,
    });
  }
};
/** Controller function to handle adding a new client meeting */
export const addClientMeetingController = async (req, res) => {
  try {
    const { lawyerId, meeting } = req.body;

    if (!lawyerId || !meeting) {
      return res.json(
        responseFormatter(
          ApiStatusCodes.BAD_REQUEST,
          false,
          null,
          "Lawyer ID or meeting data not provided"
        )
      );
    }

    const meetingResponse = await addClientMeetingService(lawyerId, meeting);

    switch (meetingResponse.status_code) {
      case ApiStatusCodes.OK:
        return res.json(
          responseFormatter(
            ApiStatusCodes.OK,
            true,
            meetingResponse.data,
            "Client meeting added successfully"
          )
        );
      case ApiStatusCodes.BAD_REQUEST:
        return res.json(
          responseFormatter(
            ApiStatusCodes.BAD_REQUEST,
            false,
            null,
            meetingResponse.message
          )
        );
      case ApiStatusCodes.DATA_NOT_FOUND:
        return res.json(
          responseFormatter(
            ApiStatusCodes.DATA_NOT_FOUND,
            false,
            null,
            meetingResponse.message
          )
        );
      default:
        return res.json(
          responseFormatter(
            ApiStatusCodes.INTERNAL_SERVER_ERROR,
            false,
            null,
            "Internal server error"
          )
        );
    }
  } catch (error) {
    return res.json(
      responseFormatter(
        ApiStatusCodes.INTERNAL_SERVER_ERROR,
        false,
        null,
        error.message
      )
    );
  }
};

export const applyToLawyerController = async (req, res) => {
  const { prisonerId } = req.body;
  const lawyerId = req.params.lawyerId;

  const result = await applyToLawyerService(lawyerId, prisonerId);
  res.status(result.status_code).json(result);
};



export const getLawyerNotifications = async (req, res) => {
  try {
    const prisoners = await getNotificationsService(req.params.lawyerId);
    res.status(200).json({ appliedPrisoners: prisoners });
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const handleLawyerDecision = async (req, res) => {
  try {
    const { prisonerId, decision } = req.body;
    const result = await handleDecisionService(req.params.lawyerId, prisonerId, decision);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message || "Server error" });
  }
};

export const getLawyerCases = async (req, res) => {
  try {
    const lawyerId = req.params.lawyerId;
    const cases = await CaseService.getCasesByLawyerId(lawyerId);
    res.status(200).json({
      status_code: 200,
      message: "Cases fetched successfully",
      data: cases,
    });
  } catch (error) {
    console.error("Error fetching cases:", error);
    res.status(500).json({
      status_code: 500,
      message: "Server error",
      error: error.message,
    });
  }
};
