// MODULES //
import { Router } from "express";

// CONTROLLERS //
import * as JudgeController from "../controllers/judge.controller.js";

// Middlewares //
import { jwtAuthMiddleware } from "../middlewares/middleware.js";

// Define Router
const router = Router();

/** POST - Route to login user or create new user - users/ua-login  */
router.post("/login", JudgeController.loginJudgeController);
router.post("/getJudgeCases", JudgeController.caseJudgeController);

export default router;
