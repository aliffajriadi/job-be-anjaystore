import orderRepository from "./order.repository.js";
import productRepository from "../product/product.repository.js";
import notificationRepository from "../notification/notification.repository.js";

class OrderService {
  async checkout(userId, { productId, quantity, currency }) {
    // 1. Fetch product to get exact pricing
    const product = await productRepository.findById(productId);
    if (!product) {
      throw new Error("Produk tidak ditemukan");
    }

    if (!product.isActive) {
      throw new Error("Produk tidak tersedia saat ini");
    }

    // 2. Validate Payment Mode Compatibility
    const isIdrRequest = currency === "IDR";
    const isDlRequest = currency === "DL";

    if (isIdrRequest && product.priceMode === "DL_ONLY") {
      throw new Error("Produk ini hanya bisa dibeli dengan Diamond Lock");
    }
    if (isDlRequest && product.priceMode === "IDR_ONLY") {
      throw new Error("Produk ini hanya bisa dibeli dengan Saldo Rupiah");
    }

    // 3. Calculate Total Price on server-side
    let finalPrice = 0;
    if (isIdrRequest) {
      finalPrice = (product.priceIdr || 0) * quantity;
    } else {
      finalPrice = (product.priceDl || 0) * quantity;
    }

    // 4. Create the integrated transaction order
    const order = await orderRepository.createOrder({
      userId,
      productId: Number(productId),
      quantity: Number(quantity),
      totalPrice: finalPrice,
      currency,
      status: "COMPLETED",
    });

    // 5. Send Notification
    await notificationRepository.createNotification(
      userId,
      "🛒 Pembelian Berhasil!",
      `Yeay! Anda berhasil membeli ${quantity}x ${product.name}. Silahkan konfirmasi ke Admin jika pesanan Anda berupa Item Non-Otomatis.`,
      "SUCCESS",
    );

    return order;
  }

  async getMyOrders(userId) {
    return await orderRepository.findByUserId(userId);
  }
}

export default new OrderService();
