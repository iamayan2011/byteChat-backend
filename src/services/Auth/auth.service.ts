import User from '../../models/user.model';
import {Response} from "express";
import bcrypt from 'bcryptjs';
import { HttpStatus } from '../../common/HttpStatus';
import { generateToken } from '../../lib/utils';
import * as authServiceHelper from './auth.service.helper';

export const signup = async (body: { fullName: string; email: string; password: string; }, res: Response) => {
    const { fullName, email, password } = body;

    try {
        const hashedPassword = await authServiceHelper.hashPassword(password);
        const newUser = new User({
            fullName,
            email,
            password: hashedPassword
        });

        if (newUser) {
            const token = generateToken(newUser._id.toString(), res);
            await newUser.save();
            return authServiceHelper.generateUserResponse(newUser, token);
        }
    } catch (error) {
        throw authServiceHelper.generateError(
            'Error creating new user. Please try again later.',
            HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};

export const login = async (body: { email: string; password: string; }, res: Response) => {
    const { email, password } = body;

    try {
        const user = await authServiceHelper.findUserByEmail(email);
        if (!user) {
            throw authServiceHelper.generateError('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }

        const isPasswordValid = await authServiceHelper.verifyPassword(password, user.password);
        if (!isPasswordValid) {
            throw authServiceHelper.generateError('Invalid email or password', HttpStatus.UNAUTHORIZED);
        }

        const token = generateToken(user._id.toString(), res);
        return authServiceHelper.generateUserResponse(user, token);
    } catch (error: any) {
        throw authServiceHelper.generateError(
            error.message || 'Login failed',
            error.status || HttpStatus.INTERNAL_SERVER_ERROR
        );
    }
};
