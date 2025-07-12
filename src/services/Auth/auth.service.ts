import User from "../../models/user.model";
import { Response } from "express";
import { HttpStatus } from "../../common/HttpStatus";
import { generateToken } from "../../lib/utils";
import * as authServiceHelper from "./auth.service.helper";
import { generateError } from "../../lib/utils";
import cloudinary from "../../lib/cloudinary";

export const signup = async (
  body: { fullName: string; email: string; password: string },
  res: Response
) => {
  const { fullName, email, password } = body;

  try {
    const hashedPassword = await authServiceHelper.hashPassword(password);
    const newUser = new User({
      fullName,
      email,
      password: hashedPassword,
    });

    if (newUser) {
      const token = generateToken(newUser._id.toString(), res);
      await newUser.save();
      return authServiceHelper.generateUserResponse(newUser, token);
    }
  } catch (error) {
    throw generateError(
      "Error creating new user. Please try again later.",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const login = async (
  body: { email: string; password: string },
  res: Response
) => {
  const { email, password } = body;

  try {
    const user = await authServiceHelper.findUserByEmail(email);
    if (!user) {
      throw generateError(
        "Invalid email or password",
        HttpStatus.UNAUTHORIZED
      );
    }

    const isPasswordValid = await authServiceHelper.verifyPassword(
      password,
      user.password
    );
    if (!isPasswordValid) {
      throw generateError(
        "Invalid email or password",
        HttpStatus.UNAUTHORIZED
      );
    }

    const token = generateToken(user._id.toString(), res);
    return authServiceHelper.generateUserResponse(user, token);
  } catch (error: any) {
    throw generateError(
      error.message || "Login failed",
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};

export const updateUserProfile = async (
  userId: string,
  updateData: { profilePic: Base64URLString }
) => {
  try {
    const uploadResponse = await cloudinary.uploader.upload(
      updateData.profilePic
    );
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      { profilePic: uploadResponse.secure_url },
      { new: true, runValidators: true }
    );

    if (!updatedUser) {
      throw generateError(
        "User not found while updating profile picture",
        HttpStatus.NOT_FOUND
      );
    }

    return updatedUser;
  } catch (error: any) {
    throw generateError(
      error.message || "Failed to update profile",
      error.status || HttpStatus.INTERNAL_SERVER_ERROR
    );
  }
};
