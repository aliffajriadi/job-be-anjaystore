import express from "express";
import topupController from "./topup.controller.js";

const router = express.Router();

// Public route for Growtopia Webhook/Script
router.post("/growtopia", topupController.addBalance);

export default router;
