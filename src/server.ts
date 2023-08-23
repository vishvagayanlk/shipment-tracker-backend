import express, {
  ErrorRequestHandler,
  NextFunction,
  Request,
  Response,
} from "express";
import { logger } from "./core/logger";
import cors from "cors";
import morgan from "morgan";
import authRouter from "./router/auth";
import shipmentRouter from "./router/shipment";
import authVerifyMiddleware from "./middleware/auth-verify";
import publicTrackingRouter from "./router/public-tracking";
import trackingRouter from "./router/tracking";

const app = express();
app.use(cors());
app.use(morgan("combined"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/auth", authRouter);
app.use("/shipment", authVerifyMiddleware, shipmentRouter);
app.use("/tracking", authVerifyMiddleware, trackingRouter);
app.use("/track", publicTrackingRouter);
app.use(
  (
    err: ErrorRequestHandler,
    _req: Request,
    res: Response,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    _next: NextFunction,
  ): void => {
    logger.error(`There was an Error ${err}`);
    res.json({
      message: `There was an Error ${err}`,
    });
  },
);

export default app;
