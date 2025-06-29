import { Request, Response, NextFunction } from "express";
import { ValidationError } from "joi";
import { HttpStatus } from "../common/HttpStatus";

export function responseEnhancer(req: Request, res: Response, next: NextFunction) {
  res.withData = (data: unknown, message: string, statusCode: number) => {
    res.status(statusCode).json({ success: true, message, data });
  };
  res.withError = (message: unknown, statusCode = HttpStatus.BAD_REQUEST, data?: unknown) => {
    res.status(statusCode).json({ success: false, message, data });
  };
  res.withValidation = (data: ValidationError["details"]) => {
    res.status(422).json({ success: false, message: "Validation Error", data });
  };
  next();
}