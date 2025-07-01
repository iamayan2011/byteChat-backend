import express from 'express';
import * as authController from "../../controllers/Auth/auth.controller";
import {validateRequest} from "../../middleware/validation.middleware";
import * as authValidation from "./auth.validation";
import * as authMiddleware from "../../middleware/auth.middleware";

const router = express.Router();

router.post('/signup',
    validateRequest(authValidation.signupValidation),
    authMiddleware.checkEmailForSignup,
    authController.signup
);
router.post('/login',
    validateRequest(authValidation.loginValidation),
    authMiddleware.checkEmailForLogin,
    authController.login
);
router.post('/logout',
    authController.logout
);
router.put("/update-profile",
    authMiddleware.checkAuthenticated,
    authController.updateProfile
);
router.get("/check-auth",
    authMiddleware.checkAuthenticated,
    authController.checkAuth
)
export default router;