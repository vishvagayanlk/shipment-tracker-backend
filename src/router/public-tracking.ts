import { Router } from "express";
import trackingController from "../controllers/tracking";

const publicTrackingRouter = Router();

publicTrackingRouter.get("/", trackingController.getTrackingCodeController);

export default publicTrackingRouter;
