import prisma from "../../common/config/prisma.js";

class OrderRepository {
  async createOrder({
    userId,
    productId,
    quantity,
    totalPrice,
    currency,
    status,
  }) {
    return await prisma.$transaction(async (tx) => {
      // 1. Check stock
      const product = await tx.product.findUnique({
        where: { id: productId },
      });

      if (!product || product.stock < quantity) {
        throw new Error("Stok produk tidak mencukupi");
      }

      // 2. Deduct balance from user
      const user = await tx.user.findUnique({ where: { id: userId } });
      if (currency === "IDR") {
        if (user.balance < totalPrice) {
          throw new Error("Saldo Rupiah tidak mencukupi");
        }
        await tx.user.update({
          where: { id: userId },
          data: { balance: { decrement: totalPrice } },
        });
      } else if (currency === "DL") {
        // Convert DL to WL (1 DL = 100 WL)
        const totalWl = totalPrice * 100;
        if (user.wl < totalWl) {
          throw new Error("Saldo Diamond Lock tidak mencukupi");
        }
        await tx.user.update({
          where: { id: userId },
          data: { wl: { decrement: totalWl } },
        });
      }

      // 3. Deduct stock from product
      await tx.product.update({
        where: { id: productId },
        data: { stock: { decrement: quantity } },
      });

      // 4. Create Order
      const order = await tx.order.create({
        data: {
          userId,
          productId,
          quantity,
          totalPrice,
          currency,
          status: "COMPLETED", // For now auto-complete
        },
      });

      return order;
    });
  }

  async findByUserId(userId) {
    return await prisma.order.findMany({
      where: { userId },
      include: { product: true },
      orderBy: { createdAt: "desc" },
    });
  }
}

export default new OrderRepository();
