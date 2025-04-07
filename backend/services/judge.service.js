import Judge from "../models/judge-model.js";
import jwt from "jsonwebtoken";
import { ApiStatusCodes, ResponseMessages } from "../enums/app.enums.js";
import { comparePassword } from "../utils/app.utils.js";
import { generateToken } from "../middlewares/auth.js";
import Case from "../models/case-model.js";
import mongoose from "mongoose";
export const loginJudgeService = async (email_id, password) => {
  try {
    // Find the judge by email_id
    const judge = await Judge.findOne({ email_id });

    if (!judge) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "Judge not found",
      };
    }
    const judgePassword = judge.password;

    // Check if the password is correct
    const isPasswordValid = comparePassword(password, judgePassword);
    if (!isPasswordValid) {
      return {
        status_code: ApiStatusCodes.BAD_REQUEST,
        data: null,
        message: "Invalid password",
      };
    }
    const payload = {
      id: judge._id.toString(),
    };
    console.log(payload);

    const token = generateToken(payload);
    console.log(token);

    return {
      status_code: ApiStatusCodes.OK,
      data: { judge, token },
      message: "Judge logged in successfully",
    };
  } catch (err) {
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: err.message,
    };
  }
};
export const getJudgeCases = async (judgeId) => {
  try {
    console.log(judgeId)
    const cases = await Case.find({ judge: new mongoose.Types.ObjectId(judgeId) });
    console.log(cases);
    if (!cases || cases.length === 0) {
      return {
        status_code: ApiStatusCodes.DATA_NOT_FOUND,
        data: null,
        message: "No cases found for this judge",
      };
    }

    return {
      status_code: ApiStatusCodes.OK,
      data: cases,
      message: "Cases retrieved successfully",
    };
  } catch (error) {
    console.error("Error in getJudgeCase:", error.message);
    return {
      status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
      data: null,
      message: "Internal server error",
    };
  }
};
