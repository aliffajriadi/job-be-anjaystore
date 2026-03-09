import prisma from "../../common/config/prisma.js";

class ProductRepository {
  async findAll() {
    return await prisma.product.findMany({
      orderBy: { createdAt: "desc" },
    });
  }

  async findById(id) {
    return await prisma.product.findUnique({
      where: { id },
    });
  }

  async create(data) {
    return await prisma.product.create({ data });
  }

  async update(id, data) {
    return await prisma.product.update({ where: { id }, data });
  }

  async delete(id) {
    return await prisma.product.delete({ where: { id } });
  }

  // Stock Item Operations (Pre-implemented for future automated delivery)
  async addStockItem(productId, content) {
    return await prisma.stockItem.create({
      data: {
        productId,
        content,
        status: "AVAILABLE",
      },
    });
  }

  async getStockItems(productId) {
    return await prisma.stockItem.findMany({
      where: { productId },
      orderBy: { createdAt: "desc" },
    });
  }

  async deleteStockItem(id) {
    return await prisma.stockItem.delete({
      where: { id },
    });
  }
}

export default new ProductRepository();
