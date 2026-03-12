import prisma from '../../common/config/prisma.js';

class GrowtopiaRepository {
  async findAll() {
    // return await prisma.growtopia.findMany();
  }

  // async findById(id) {
  //   // return await prisma.growtopia.findUnique({ where: { id } });
  // }

  // async create(data) {
  //   // return await prisma.growtopia.create({ data });
  // }

  // async update(id, data) {
  //   // return await prisma.growtopia.update({ where: { id }, data });
  // }

  // async delete(id) {
  //   // return await prisma.growtopia.delete({ where: { id } });
  // }
}

export default new GrowtopiaRepository();
