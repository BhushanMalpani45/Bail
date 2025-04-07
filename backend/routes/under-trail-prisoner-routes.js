// MODULES //
import { Router } from "express";

// CONTROLLERS //
import * as UnderTrailPrisonerController from "../controllers/under-trail-prisoner.controller.js";

// Middlewares //
import { jwtAuthMiddleware } from "../middlewares/middleware.js";
import { upload } from "../middlewares/multer-config.js";
// Define Router
const router = Router();

/** POST - Route to login user or create new user - users/ua-login  */
router.post("/login", UnderTrailPrisonerController.loginUndertrialController);

// GET Route to get all the data of Under-Trail-Prisoner
router.get(
  "/getAllPrisonerDetails",

  UnderTrailPrisonerController.getAllUnderTrialPrisonersController
);

// GET Route to get all the detail of Prisoner by Name //
router.post(
  "/getPrisonerDetailsByName",
  UnderTrailPrisonerController.getPrisonerByNameController
);

//GET Route to get all the details of Prisoners past records
router.post(
  "/getPastDetailsOfPrisoner",
  UnderTrailPrisonerController.getPastRecordsController
);

// Route to get all the details of the Prisoners Family Background //
router.post(
  "/getDetailsOfPrisonerFamily",
  UnderTrailPrisonerController.getPrisonerFamilyBackgroundController
);

// Route to upload a single document specified by the Lawyer //
router.post(
  "/uploadDocument",
  upload.single("document"),
  UnderTrailPrisonerController.uploadDocumentController
);

// Route to get the uploaded document of Prisoner //
router.post(
  "/getDocument",
  UnderTrailPrisonerController.handleDocumentsController
);

// Post route to Book an  Appointment of Lawyer
router.post(
  "/bookAppointment",
  UnderTrailPrisonerController.bookAppointmentController
);

router.post(
  "/generateBailPdf",
  UnderTrailPrisonerController.handleGeneratePdfRequest
);

router.post(
  "/caseDetailsByPrisonerId",
  UnderTrailPrisonerController.getCasesByPrisonerIdController
);

// Route to verify token
router.post(
  "/verifyToken",
  jwtAuthMiddleware,
  UnderTrailPrisonerController.verifyTokenController
);

export default router;
