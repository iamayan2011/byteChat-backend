import User from "../../models/user.model";
import Message from "../../models/message.model";
import { HttpStatus } from "../../common/HttpStatus";
import { generateError } from "../../lib/utils";

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
