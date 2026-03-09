import prisma from "../../common/config/prisma.js";

class ConfigRepository {
  async getConfig() {
    let config = await prisma.config.findFirst();
    if (!config) {
      config = await prisma.config.create({
        data: { depo_world: "GONDOOLA26" },
      });
    }
    return config;
  }

  async updateConfig(data) {
    const config = await this.getConfig();
    return await prisma.config.update({
      where: { id: config.id },
      data,
    });
  }
}

export default new ConfigRepository();
