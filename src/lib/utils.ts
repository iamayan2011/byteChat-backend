import jwt, {JwtPayload} from "jsonwebtoken";
import {Response} from "express";
import {env} from "../config/env.config";


export const generateToken = (userId: string, res:Response) => {
    const token = jwt.sign({userId} as JwtPayload, env.JWT_SECRET, {expiresIn: '7d'});
    res.cookie("token", token, {
        httpOnly: true, // Prevents client-side JavaScript from accessing the cookie (XSS attaks cross-site scripting attacks   )
        secure: env.NODE_ENV !== "development", // Ensures the cookie is sent over HTTPS in production
        sameSite: "strict", //CSRF attacks cross-site request forgery attacks
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days in ms
    });
    return token;
}