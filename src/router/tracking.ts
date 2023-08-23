import { Router } from "express";
import trackingController from "../controllers/tracking";
import inputValidationMiddleware from "../middleware/input-validation";
import updateTrackingDetailsSchema from "../schema/update-tracking-input.schema";

const trackingRouter = Router();

trackingRouter.post(
  "/update",
  inputValidationMiddleware(updateTrackingDetailsSchema),
  trackingController.updateTrackingDetailsController,
);
trackingRouter.get("/", trackingController.getTrackingDetailsByIdController);

export default trackingRouter;
