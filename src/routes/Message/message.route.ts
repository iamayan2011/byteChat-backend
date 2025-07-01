import express from "express";
import * as authMiddleware from "../../middleware/auth.middleware";
import * as messageController from "../../controllers/Message/message.controller";
const router = express.Router();

router.get("/users",
    authMiddleware.checkAuthenticated,
    messageController.getUsers
);
export default router;
