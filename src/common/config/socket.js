import { Server } from "socket.io";

let io;

export const initSocket = (server) => {
  io = new Server(server, {
    cors: {
      origin: ["http://localhost:3000", "http://192.168.1.8:3000", "https://anjay.fun", "https://www.anjay.fun"],
      methods: ["GET", "POST"],
      credentials: true,
    },
  });

  let visitorCount = 0;

  io.on("connection", (socket) => {
    visitorCount++;
    console.log(
      `🔌 [Socket.IO] New connection: ${socket.id} (Total: ${visitorCount})`,
    );

    // Broadcast visitor count to all clients
    io.emit("visitor-count", visitorCount);

    socket.on("error", (err) => {
      console.error(`❌ [Socket.IO] Socket error:`, err);
    });

    socket.on("disconnect", (reason) => {
      visitorCount = Math.max(0, visitorCount - 1);
      console.log(
        `🔌 [Socket.IO] Disconnected: ${socket.id} (Total: ${visitorCount})`,
      );
      io.emit("visitor-count", visitorCount);
    });
  });

  return io;
};

export const getIo = () => {
  if (!io) {
    throw new Error("Socket.io not initialized!");
  }
  return io;
};
