import { NextFunction, Request, Response } from "express";
import { z, ZodError } from "zod";

const inputValidationMiddleware =
  (schema: z.Schema) => (req: Request, res: Response, next: NextFunction) => {
    try {
      schema.parse(req.body);
      next();
    } catch (error) {
      if (error instanceof ZodError) {
        res.status(400).json({
          error: error.message,
        });
      } else {
        next(error);
      }
    }
  };

export default inputValidationMiddleware;
