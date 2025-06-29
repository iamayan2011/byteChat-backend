import { Response } from 'express';
import User from '../../models/user.model';
import bcrypt from 'bcryptjs';
import { generateToken } from '../../lib/utils';
import { HttpStatus } from '../../common/HttpStatus';

export const generateError = (stack: string, status: number) => {
    const err: any = new Error(stack);
    err.status = status;
    return err;
};

export const findUserByEmail = async (email: string) => {
    return await User.findOne({ email });
};

export const findUserById = async (id: string) => {
    return await User.findById({id}).select('-password');;
}

export const hashPassword = async (password: string) => {
    const salt = await bcrypt.genSalt(10);
    return await bcrypt.hash(password, salt);
};

export const verifyPassword = async (password: string, hashedPassword: string) => {
    return await bcrypt.compare(password, hashedPassword);
};

export const generateUserResponse = (user: any, token: string) => {
    return {
        user: {
            _id: user._id,
            email: user.email,
            fullName: user.fullName,
            profilePic: user.profilePic
        },
        token
    };
};

