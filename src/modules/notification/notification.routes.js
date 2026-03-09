import express from "express";
import notificationController from "./notification.controller.js";
import authMiddleware from "../../common/middleware/auth.middleware.js";

const router = express.Router();

router.use(authMiddleware);

router.get("/", notificationController.getAll);
router.post("/read-all", notificationController.readAll);
router.put("/:id/read", notificationController.read);
router.delete("/:id", notificationController.remove);

export default router;
