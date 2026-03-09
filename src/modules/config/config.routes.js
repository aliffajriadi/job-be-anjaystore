import { Router } from "express";
import configController from "./config.controller.js";

const router = Router();

// Middleware to check admin key for specific routes
const authenticateAdmin = (req, res, next) => {
  const adminKey = process.env.ADMIN_KEY || "anjay-admin";
  const providedKey =
    req.headers["x-admin-key"] || req.headers["authorization"];

  if (providedKey === adminKey) {
    next();
  } else {
    res.status(403).json({ message: "Akses ditolak: Admin Only" });
  }
};

router.get("/", configController.getConfig);
router.post("/login", configController.loginAdmin);
router.put("/", authenticateAdmin, configController.updateConfig);

export default router;
