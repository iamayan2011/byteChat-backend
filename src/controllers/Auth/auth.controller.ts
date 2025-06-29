import {Request, Response, RequestHandler} from "express";
import {HttpStatus} from '../../common/HttpStatus';
import * as authServices from '../../services/Auth/auth.service';

export const signup: RequestHandler = async (req, res) => {
  try {
    const result = await authServices.signup(req.body, res);
    res.withData(result, "Signup successful", HttpStatus.CREATED);
  } catch (error: any) {
    res.withError(
      error.message || error,
      error.status || HttpStatus.INTERNAL_SERVER_ERROR,
    );
  }
};
export const login: RequestHandler = async (req, res) => {
    try {
        const result = await authServices.login(req.body, res);
        res.withData(result, "Login successful", HttpStatus.OK);
    } catch (error: any) {
        res.withError(
            error.message || error,
            error.status || HttpStatus.INTERNAL_SERVER_ERROR,
        );
    }
};

export const logout =  (req: Request, res: Response) => {
    try {
        res.clearCookie('token');
        res.withData(true, "Logout successful", HttpStatus.OK);
    } catch (error) {
        res.withError("Something went wrong while logging out", HttpStatus.INTERNAL_SERVER_ERROR)
    }
};

export const updateProfile =  (req: Request, res: Response) => {

}