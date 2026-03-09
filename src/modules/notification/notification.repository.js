import prisma from "../../common/config/prisma.js";
import { getIo } from "../../common/config/socket.js";

class NotificationRepository {
  async createNotification(userId, title, message, type = "INFO") {
    const notification = await prisma.notification.create({
      data: {
        userId,
        title,
        message,
        type,
      },
    });

    // Real-time notification broadcast via Socket.IO
    try {
      const io = getIo();
      io.emit(`new-notification-${userId}`, notification);
    } catch (e) {
      console.warn(
        "Socket not initialized when emitting notification:",
        e.message,
      );
    }

    return notification;
  }

  async getNotifications(userId) {
    return await prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" },
    });
  }

  async markAsRead(notificationId) {
    return await prisma.notification.update({
      where: { id: notificationId },
      data: { isRead: true },
    });
  }

  async markAllAsRead(userId) {
    return await prisma.notification.updateMany({
      where: { userId, isRead: false },
      data: { isRead: true },
    });
  }

  async deleteNotification(notificationId) {
    return await prisma.notification.delete({
      where: { id: notificationId },
    });
  }
}

export default new NotificationRepository();
