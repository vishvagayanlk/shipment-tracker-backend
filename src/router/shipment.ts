import { Router } from "express";
import shipmentController from "../controllers/shipment";
import inputValidationMiddleware from "../middleware/input-validation";
import createShipmentSchema from "../schema/shipment-creation-input.schema";

const shipmentRouter = Router();

shipmentRouter.post(
  "/create",
  inputValidationMiddleware(createShipmentSchema),
  shipmentController.createShipmentController,
);

shipmentRouter.get(
  "/all",
  shipmentController.getAllShipmentsByUserIdController,
);

export default shipmentRouter;
