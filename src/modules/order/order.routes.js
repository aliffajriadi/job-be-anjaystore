import express from "express";
import orderController from "./order.controller.js";
import authenticateToken from "../../common/middleware/auth.middleware.js";

const router = express.Router();

router.use(authenticateToken); // Protect all order routes

router.post("/checkout", orderController.checkout);
router.get("/me", orderController.getMyOrders);

export default router;
