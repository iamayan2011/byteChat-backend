import { Request, Response } from "express";
import { HttpStatus } from "../../common/HttpStatus";
import * as messageServices from "../../services/Message/message.service";

export const getUsers = async (req: Request, res: Response) => {
  try {
    const loggedInUserId = req.user._id;
    const users = await messageServices.getUsers(loggedInUserId);
    res.withData(users, "Users fetched successfully", HttpStatus.OK);
  } catch (error: any) {
    res.withError(
      error.message || "Error fetching users",
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const getMessages = async (req: Request, res: Response) => {
  try {
    const myId = req.user._id;
    const { id: userToChatId } = req.params;
    const messages = await messageServices.getMessages(myId, userToChatId);
    res.withData(messages, "Messages fetched successfully", HttpStatus.OK);
  } catch (error: any) {
    res.withError(
      error.message || "Error fetching messages",
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const sendMessage = async (req: Request, res: Response) => {
  try {
    const { id: userToChatId } = req.params;
    const { text, image } = req.body;
    const myId = req.user._id;
    const messages = await messageServices.sendMessage(
      myId,
      userToChatId,
      text,
      image
    );
    res.withData(messages, "Messages sent successfully", HttpStatus.CREATED);
  } catch (error: any) {
    res.withError(
      error.message || "Error sending messages",
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
