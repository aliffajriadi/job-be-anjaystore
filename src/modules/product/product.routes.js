import express from "express";
import productController from "./product.controller.js";
import adminAuth from "../../common/middleware/admin.middleware.js";

const router = express.Router();

// Public Routes
router.get("/", productController.getAll);
router.get("/:id", productController.getById);

// Admin Only Routes
router.post("/", adminAuth, productController.create);
router.put("/:id", adminAuth, productController.update);
router.delete("/:id", adminAuth, productController.delete);

// Stock Management (Admin Only)
router.get("/:id/stock", adminAuth, productController.listStockItems);
router.post("/:id/stock", adminAuth, productController.addStockItem);
router.delete("/stock/:itemId", adminAuth, productController.deleteStockItem);

export default router;
