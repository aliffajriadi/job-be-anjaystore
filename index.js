import express from "express";
import cors from "cors";
import { createServer } from "http";
import "dotenv/config";

import { initSocket } from "./src/common/config/socket.js";
import authRoutes from "./src/modules/auth/auth.routes.js";
import productRoutes from "./src/modules/product/product.routes.js";
import configRoutes from "./src/modules/config/config.routes.js";
import topupRoutes from "./src/modules/topup/topup.route.js";
import notificationRoutes from "./src/modules/notification/notification.routes.js";

const app = express();
const server = createServer(app);
const PORT = process.env.PORT || 5000;

// --- INITIALIZE SOCKET ---

// --- CONFIGURASI CORS ---
app.use(
  cors({
    origin: ["http://localhost:3000", "http://192.168.1.8:3000", "https://anjay.fun", "https://www.anjay.fun"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization", "X-Admin-Key"],
    credentials: true,
  }),
);

initSocket(server);


app.use(express.json());

// --- ROUTES ---
app.use("/api/auth", authRoutes);
app.use("/api/products", productRoutes);
app.use("/api/config", configRoutes);
app.use("/api/topup", topupRoutes);
app.use("/api/notifications", notificationRoutes);

// --- RUN SERVER ---
server.listen(PORT, "0.0.0.0", () => {
  console.log(`-----------------------------------------`);
  console.log(`🚀 Server berjalan di:`);
  console.log(`Local:   http://localhost:${PORT}`);
  console.log(`Network: http://0.0.0.0:${PORT}`);
  console.log(`-----------------------------------------`);
});
