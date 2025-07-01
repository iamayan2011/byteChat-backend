import { ValidationError } from "joi";
import User from "../../models/user.model";

declare module "express-serve-static-core" {
  interface Request {
    user?: User;
  }
  interface Response {
    withData: (data: unknown, message: string, statusCode: number) => void;
    withError: (
      message: string | unknown,
      statusCode?: number,
      data?: unknown
    ) => void;
    withValidation: (data: ValidationError["details"]) => void;
  }
}