import { Request, Response, NextFunction } from 'express';
import * as authHelper from '../services/Auth/auth.service.helper';
import { HttpStatus } from '../common/HttpStatus';
import jwt , {JwtPayload} from 'jsonwebtoken';
import User from '../models/user.model';
import { env } from '../config/env.config';
import {findUserById} from "../services/Auth/auth.service.helper";

interface CustomJwtPayload extends JwtPayload {
    userId: string;
}

export const checkEmailForSignup = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authHelper.findUserByEmail(req.body.email);
        if (user) {
            return res.withError(
                'Email already exists. Please login instead.',
                HttpStatus.CONFLICT
            );
        }
        next();
    } catch (error) {
        return res.withError(
            'Error checking email',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export const checkEmailForLogin = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await authHelper.findUserByEmail(req.body.email);
        if (!user) {
            return res.withError(
                'Email not found. Please signup first.',
                HttpStatus.NOT_FOUND
            );
        }
        next();
    } catch (error) {
        return res.withError(
            'Error checking email',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export const checkAuthenticated = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const token = req.cookies.token || req.headers.authorization?.split(' ')[1];
        if(!token) {
            return res.withError(
                'Unauthorized. Please login first.',
                HttpStatus.UNAUTHORIZED
            );
        }
        const decoded = jwt.verify(token, env.JWT_SECRET) as CustomJwtPayload;
        if(!decoded) {
            return res.withError(
                'Unauthorized. Invalid token.',
                HttpStatus.UNAUTHORIZED
            );
        }
        let userId = decoded.userId;
        const user = authHelper.findUserById(userId);
        if(!user) {
            return res.withError(
                'Unauthorized. User not found.',
                HttpStatus.UNAUTHORIZED
            );
        }
        req.user = user;
        next();

    } catch (error) {
        return res.withError(
            'Error checking authentication.',
            HttpStatus.INTERNAL_SERVER_ERROR
        )
    }
}