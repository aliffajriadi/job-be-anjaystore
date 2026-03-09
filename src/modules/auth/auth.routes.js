import express from "express";
import authController from "./auth.controller.js";
import authenticateToken from "../../common/middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", authController.register);
router.post("/login", authController.login);
router.get("/me", authenticateToken, authController.getMe);
router.put("/profile", authenticateToken, authController.updateProfile);
router.put(
  "/change-password",
  authenticateToken,
  authController.changePassword,
);

export default router;
