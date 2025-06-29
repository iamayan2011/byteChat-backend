import { Request, Response, NextFunction } from 'express';
import { Schema } from 'joi';
import { HttpStatus } from '../common/HttpStatus';

export const validateRequest = (schema: Schema) => {
    return (req: Request, res: Response, next: NextFunction) => {
        const { error } = schema.validate(req.body, { abortEarly: false });

        if (error) {
            const errorMessage = error.details
                .map(detail => detail.message)
                .join(', ');

            return res.withError(
                errorMessage,
                HttpStatus.UNPROCESSABLE_ENTITY
            );
        }

        next();
    };
};