import prisma from "../../common/config/prisma.js";

class TopupRepository {
  async findByGrowid(growid) {
    return await prisma.user.findFirst({
      where: { growid },
    });
  }

  async addWLBalance(userId, amount) {
    return await prisma.user.update({
      where: { id: userId },
      data: {
        wl: {
          increment: amount,
        },
      },
    });
  }
}

export default new TopupRepository();
