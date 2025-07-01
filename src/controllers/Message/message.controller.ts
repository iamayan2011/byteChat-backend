import express, {Request, Response} from "express";
import User from "../../models/user.model";
import { HttpStatus } from "../../common/HttpStatus";
import * as messageServices from "../../services/Message/message.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await messageServices.getUsers(loggedInUserId);
    res.withData(users, 'Users fetched successfully', HttpStatus.OK);
  } catch (error: any) {
    res.withError(
      error.message || 'Error fetching users',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};