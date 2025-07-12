import dotenv from "dotenv";
dotenv.config();
import express, {Express} from 'express';
import { responseEnhancer } from "./middleware/response.middleware";
import authRoutes from "./routes/Auth/auth.route";
import messageRoutes from "./routes/Message/message.route";
import { validateEnv, env } from './config/env.config';
import {connectDB} from "./lib/db";
import cookieParser from "cookie-parser";
import cors from "cors";

validateEnv();
const app: Express = express();
const port = env.PORT;

app.use(express.json({ limit: "10mb" }));
app.use(express.urlencoded({ extended: true, limit: "10mb" }));
app.use(cookieParser());
app.use(responseEnhancer);
app.use(
  cors({
    origin: "http://localhost:5173",
    credentials: true,
  })
);

app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);

app.listen(port, async () => {
  console.log(`Server is running on port ${port}`);
  await connectDB();
});