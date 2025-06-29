import { HttpStatus } from "./HttpStatus";

export const SOMETHING_WENT_WRONG = {
    status: HttpStatus.BAD_REQUEST,
    message: 'Something went wrong. Try again later.',
};

export const BAD_REQUEST = {
    status: HttpStatus.BAD_REQUEST,
    message: 'Bad request. Check your request parameters and try again.',
};

export const NOT_AUTHENTICATED = {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Please login to continue',
};

export const INVALID_TOKEN = {
    status: HttpStatus.UNAUTHORIZED,
    message: 'Invalid or expired token. Please log in again.',
};

export const NOT_AUTHORIZED = {
    status: HttpStatus.FORBIDDEN,
    message: 'You are not authorized to perform this action',
};

export const USER_NOT_FOUND = {
    status: 404,
    message: 'User not found.',
};

export const ANOTHER_DEVICE_LOGIN = {
    status: HttpStatus.CONFLICT,
    message: 'Detected login from another device. Logging out from this device for security reasons',
};

export const SERVER_ERROR = {
    status: HttpStatus.INTERNAL_SERVER_ERROR,
    message: 'An unexpected server error occurred. Please try again later.',
};
