import configService from "./config.service.js";

class ConfigController {
  async getConfig(req, res) {
    try {
      const config = await configService.getConfig();
      res.json(config);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal mengambil konfigurasi", error: error.message });
    }
  }

  async updateConfig(req, res) {
    try {
      const config = await configService.updateConfig(req.body);
      res.json({ message: "Konfigurasi diperbarui", config });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Gagal memperbarui konfigurasi",
          error: error.message,
        });
    }
  }

  async loginAdmin(req, res) {
    try {
      const { key } = req.body;
      const isValid = await configService.verifyAdminKey(key);
      if (isValid) {
        res.json({ success: true, message: "Login Berhasil" });
      } else {
        res.status(401).json({ success: false, message: "Key Admin Salah!" });
      }
    } catch (error) {
      res.status(500).json({ message: "Server error", error: error.message });
    }
  }
}

export default new ConfigController();
