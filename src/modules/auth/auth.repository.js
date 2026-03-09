import prisma from "../../common/config/prisma.js";

class AuthRepository {
  async findByUsername(username) {
    return await prisma.user.findUnique({ where: { username } });
  }

  async findById(id) {
    return await prisma.user.findUnique({
      where: { id },
      select: {
        id: true,
        username: true,
        balance: true,
        wl: true,
        avatar: true,
        createdAt: true,
        growid: true,
        role: true,
      },
    });
  }

  async createUser(data) {
    return await prisma.user.create({
      data: {
        username: data.username,
        password: data.password,
        balance: 0,
        wl: 0,
      },
    });
  }

  async updateUser(id, data) {
    return await prisma.user.update({
      where: { id },
      data,
    });
  }

  async findByGrowid(growid) {
    return await prisma.user.findUnique({ where: { growid } });
  }
}

export default new AuthRepository();
