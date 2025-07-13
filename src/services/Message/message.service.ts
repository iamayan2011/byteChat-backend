import User from "../../models/user.model";
import Message from "../../models/message.model";
import { HttpStatus } from "../../common/HttpStatus";
import { generateError } from "../../lib/utils";
import cloudinary from "../../lib/cloudinary";
import { getReceiverSocketId, io } from "../../lib/socket";

export const getUsers = async (loggedInUserId: string) => {
  try {
    const users = await User.find({ _id: { $ne: loggedInUserId } })
      .select('-password')
      .lean();
    return users;
  } catch (error: any) {
    throw generateError(
      error.message || 'Error fetching users',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const getMessages = async (myId: string, userToChatId: string) => {
  try {
    const messages = await Message.find({
      $or: [
        { senderId: myId, receiverId: userToChatId },
        { senderId: userToChatId, receiverId: myId },
      ],
    })
    return messages;
  } catch (error: any) {
    throw generateError(
      error.message || 'Error fetching messages',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const sendMessage = async (myId: string, userToChatId: string, text: string, image: string) => {
  try {
    let imageUrl;
    if(image){
      const uploadResponse = await cloudinary.uploader.upload(image);
      imageUrl = uploadResponse.secure_url;
    }
    const newMessage = new Message({
      senderId: myId,
      receiverId: userToChatId,
      text,
      image: imageUrl,
    });
    await newMessage.save();

    const receiverSocketId = getReceiverSocketId(userToChatId);
    if(receiverSocketId){
      io.to(receiverSocketId).emit("newMessage", newMessage);
    }
    return newMessage;
  } catch (error: any) {
    throw generateError(
      error.message || 'Error sending message',
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

