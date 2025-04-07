import {Router}  from "express";

import * as FaceRecognitionController from "../controllers/face-controller.js"
import { jwtAuthMiddleware } from "../middlewares/middleware.js";

const router = Router();

router.post("/face-recognition", jwtAuthMiddleware, FaceRecognitionController.faceRecognition );
export default router;