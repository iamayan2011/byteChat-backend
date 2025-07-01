import express from "express";
import * as authMiddleware from "../../middleware/auth.middleware";
import * as messageController from "../../controllers/Message/message.controller";
const router = express.Router();

router.get(
  "/users",
  authMiddleware.checkAuthenticated,
  messageController.getUsers
);
router.get(
  "/:id",
  authMiddleware.checkAuthenticated,
  messageController.getMessages
);
router.post(
  "/send/:id",
  authMiddleware.checkAuthenticated,
  messageController.sendMessage
);

export default router;
