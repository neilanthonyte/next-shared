import { NextFunction, Response, Request } from "express";
import * as uuid from "uuid";
import { ILogger } from "../services/Logger";

export interface IGenerateCorrelationIdMiddlewareOptiosn {
  /**
   * Always generate a new correlation ID regardless of whether one's already being passed through via the header
   */
  alwasyGenerateNewId?: boolean;
}

/**
 * Generates an Express middleware that'll create the x-correlation-id header
 * and log correlationId if a Logger is available.
 * TODO - add jest test
 */
export const generateCorrelationIdMiddleware = (
  logger?: ILogger,
  options?: IGenerateCorrelationIdMiddlewareOptiosn,
) => {
  return (req: Request, res: Response, next: NextFunction) => {
    // if always generate, generate a new one, log it and next.
    if (options?.alwasyGenerateNewId) {
      const correlationId = uuid.v4();
      // append the correlation ID to request headers.
      req.headers["x-correlation-id"] = correlationId;
      if (logger) {
        logger.logProperties.correlationId = correlationId;
      }
      next();
    }
    // else, only generate if it's not there
    const existingCorrelationId = Array.isArray(req.headers["x-correlation-id"])
      ? req.headers["x-correlation-id"][0]
      : req.headers["x-correlation-id"];

    req.headers["x-correlation-id"] = existingCorrelationId || uuid.v4();

    if (logger) {
      logger.logProperties.correlationId = req.headers["x-correlation-id"];
    }
    next();
  };
};
