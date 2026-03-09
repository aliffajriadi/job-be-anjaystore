import configRepository from "./config.repository.js";

class ConfigService {
  async getConfig() {
    return await configRepository.getConfig();
  }

  async updateConfig(data) {
    return await configRepository.updateConfig(data);
  }

  async verifyAdminKey(providedKey) {
    const adminKey = process.env.ADMIN_KEY || "anjay-admin";
    return providedKey === adminKey;
  }
}

export default new ConfigService();
