import notificationRepository from "./notification.repository.js";

class NotificationController {
  async getAll(req, res) {
    try {
      const notifications = await notificationRepository.getNotifications(
        req.user.id,
      );
      return res.json(notifications);
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async read(req, res) {
    try {
      const { id } = req.params;
      await notificationRepository.markAsRead(parseInt(id));
      return res.json({ message: "Notification marked as read" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async readAll(req, res) {
    try {
      await notificationRepository.markAllAsRead(req.user.id);
      return res
        .status(200)
        .json({ message: "All notifications marked as read" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }

  async remove(req, res) {
    try {
      const { id } = req.params;
      await notificationRepository.deleteNotification(parseInt(id));
      return res.status(200).json({ message: "Notification removed" });
    } catch (error) {
      return res.status(500).json({ message: error.message });
    }
  }
}

export default new NotificationController();
