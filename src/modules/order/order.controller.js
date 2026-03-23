import orderService from "./order.service.js";

class OrderController {
  async checkout(req, res) {
    try {
      const { productId, quantity, currency } = req.body;
      const userId = req.user.id; // From token

      if (!productId || !quantity || !currency) {
        return res.status(400).json({ message: "Data tidak lengkap" });
      }

      const order = await orderService.checkout(userId, {
        productId,
        quantity,
        currency,
      });
      res.status(200).json({ message: "Checkout berhasil", order });
    } catch (error) {
      console.error("Checkout error:", error.message);
      res.status(400).json({ message: error.message });
    }
  }

  async getMyOrders(req, res) {
    try {
      const userId = req.user.id;
      const orders = await orderService.getMyOrders(userId);
      res.status(200).json(orders);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new OrderController();
