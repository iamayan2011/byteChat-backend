import { ValidationError } from "joi";

declare module "express-serve-static-core" {
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