import Visitor from "../models/visitor-model.js";
import jwt from "jsonwebtoken";
import { ApiStatusCodes, ResponseMessages } from "../enums/app.enums.js";
import { comparePassword } from "../utils/app.utils.js";
import { generateToken } from "../middlewares/auth.js";
import Judge from "../models/judge-model.js"
import Lawyer from "../models/lawyer-model.js"
import Utp from "../models/under-trail-prisoner.js"
import mongoose from "mongoose";
export const visitorLoginService = async (req, res) => {
  try {
      // Extract email and password from the request body
      const { email_id, password } = req.body;

      // Find the user by email_id
      const user = await Visitor.findOne({ email_id });

      if (!user) {
          return res.status(404).json({
              status_code: ApiStatusCodes.DATA_NOT_FOUND,
              data: null,
              message: "User not found",
          });
      }

      // Check if the password is correct
      const isPasswordValid = comparePassword(user.password, password);
      if (!isPasswordValid) {
          return res.status(400).json({
              status_code: ApiStatusCodes.BAD_REQUEST,
              data: null,
              message: "Invalid password",
          });
      }

      // Generate a token
      const payload = { id: user._id.toString() };
      const token = generateToken(payload);

      // Send success response with user data and token
      return res.status(200).json({
          status_code: ApiStatusCodes.OK,
          data: { user, token },
          message: "User logged in successfully",
      });
  } catch (err) {
      console.error("Error during user login:", err);
      return res.status(500).json({
          status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
          data: null,
          message: err.message,
      });
  }
};


  export const visitorSignupService = async (req, res) => {
    console.log(req.body);
    const { email_id, password, name } = req.body;
    
    try {
        const user = await Visitor.findOne({ email_id });
        console.log(user)
        if (user) {
            return res.status(409).json({
                status_code: ApiStatusCodes.USER_EXISTS,
                data: null,
                message: "User already exists",
            });
        }
        const visitor = new Visitor({ name, email_id, password, role: "visitor" });
        await visitor.save();
        
        res.status(201).json({
            status_code: ApiStatusCodes.SUCCESS,
            data: visitor,
            message: "User registered successfully",
        });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({
            status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err.message,
        });
    }
};
export const createLawyer = async (req, res) => {
  console.log(req.body);
  const { email_id, password, name, bar_registration_number, _id  } = req.body;  
    try {
      const id=new mongoose.Types.ObjectId(_id)
        const sender = await Visitor.findById(id);
        if (sender && sender.role=="visitor"){
          return res.status(401).json({
            status_code: ApiStatusCodes.UNAUTHORIZED,
            data: null,
            message: "You are not authorized to create a judge"
          })
        } 
        const user = await Lawyer.findOne({ email_id });
        if (user) {
            return res.status(409).json({
                status_code: ApiStatusCodes.USER_EXISTS,
                data: null,
                message: "User already exists",
            });
        }
        const lawyer = new Lawyer({ name, email_id, password, bar_registration_number });
        await lawyer.save();
        
        res.status(201).json({
            status_code: ApiStatusCodes.SUCCESS,
            data: lawyer,
            message: "Judge created successfully",
        });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({
            status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err.message,
        });
    }
};
export const createUtp = async (req, res) => {
  console.log(req.body);
  const { email_id, password, name, case_id, prison_id, case_status, phone_no, address, _id  } = req.body;  
    try {
      const id=new mongoose.Types.ObjectId(_id)
        const sender = await Visitor.findById(id);
        if (sender && sender.role=="visitor"){
          return res.status(401).json({
            status_code: ApiStatusCodes.UNAUTHORIZED,
            data: null,
            message: "You are not authorized to create a judge"
          })
        } 
        const user = await Utp.findOne({ email_id });
        if (user) {
            return res.status(409).json({
                status_code: ApiStatusCodes.USER_EXISTS,
                data: null,
                message: "User already exists",
            });
        }
        const utp = new Utp({ name, email_id, password, case_id, prison_id, case_status, phone_no, address });
        await utp.save();
        
        res.status(201).json({
            status_code: ApiStatusCodes.SUCCESS,
            data: utp,
            message: "Judge created successfully",
        });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({
            status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err.message,
        });
    }
};
export const createJudge = async (req, res) => {
  console.log(req.body);
  const { email_id, password, name, court_name, _id  } = req.body;  
    try {
        const id=new mongoose.Types.ObjectId(_id);
        console.log(id)
        const sender = await Visitor.findById(id);
        if (sender && sender.role=="visitor"){
          return res.status(401).json({
            status_code: ApiStatusCodes.UNAUTHORIZED,
            data: null,
            message: "You are not authorized to create a judge"
          })
        } 
        const user = await Judge.findOne({ email_id });
        if (user) {
            return res.status(409).json({
                status_code: ApiStatusCodes.USER_EXISTS,
                data: null,
                message: "User already exists",
            });
        }
        const judge = new Judge({ name, email_id, password, court_name });
        await judge.save();
        
        res.status(201).json({
            status_code: ApiStatusCodes.SUCCESS,
            data: judge,
            message: "Judge created successfully",
        });
    } catch (err) {
        console.error("Error during user registration:", err);
        res.status(500).json({
            status_code: ApiStatusCodes.INTERNAL_SERVER_ERROR,
            data: null,
            message: err.message,
        });
    }
};
