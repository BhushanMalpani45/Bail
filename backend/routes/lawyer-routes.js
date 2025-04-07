import { Router } from "express";

import * as LawyersController from "../controllers/lawyers.controller.js";

import { jwtAuthMiddleware } from "../middlewares/middleware.js";

const router = Router();

router.post("/login", LawyersController.loginLawyerController);

router.get(
  "/getAll",
  LawyersController.getAllLawyersController
);

router.get("/", LawyersController.getLawyerByIdController);

router.post(
  "/cases",
  jwtAuthMiddleware,
  LawyersController.getCasesByLawyerIdController
);

router.post(
  "/precedents",
  jwtAuthMiddleware,
  LawyersController.getPrecedentsByLawyerIdController
);

router.post(
  "/precedents/add",
  jwtAuthMiddleware,

  LawyersController.addPrecedentToLawyer
);

router.post(
  "/getAllMeetings",
  LawyersController.getClientMeetingsController
);

router.post(
  "/addMeetings",
  jwtAuthMiddleware,
  LawyersController.addClientMeetingController
);

router.post("/apply/:lawyerId", LawyersController.applyToLawyerController);
router.get("/:lawyerId/notifications",LawyersController.getLawyerNotifications);
router.post("/decision/:lawyerId", LawyersController.handleLawyerDecision);
router.get('/:lawyerId/cases', LawyersController.getLawyerCases);

export default router;
