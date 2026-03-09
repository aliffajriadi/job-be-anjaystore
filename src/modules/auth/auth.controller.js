import authService from "./auth.service.js";

class AuthController {
  async register(req, res) {
    try {
      const { username, password } = req.body;
      const user = await authService.register(username, password);
      res.status(201).json({ message: "Registrasi berhasil", userId: user.id });
    } catch (error) {
      res
        .status(500)
        .json({
          message: "Username sudah digunakan / Password Salah",
          error: error.message,
        });
    }
  }

  async login(req, res) {
    try {
      const { username, password } = req.body;
      const loginData = await authService.login(username, password);
      res.json({ message: "Login berhasil", ...loginData });
    } catch (error) {
      const status = error.message.includes("salah") ? 400 : 500;
      res.status(status).json({ message: error.message });
    }
  }

  async getMe(req, res) {
    try {
      const user = await authService.getMe(req.user.id);
      res.json(user);
    } catch (error) {
      res
        .status(500)
        .json({ message: "Terjadi kesalahan server", error: error.message });
    }
  }

  async updateProfile(req, res) {
    try {
      const user = await authService.updateProfile(req.user.id, req.body);
      res.json({ message: "Profil berhasil diperbarui", user });
    } catch (error) {
      res
        .status(500)
        .json({ message: "Gagal memperbarui profil", error: error.message });
    }
  }

  async changePassword(req, res) {
    try {
      const result = await authService.changePassword(req.user.id, req.body);
      res.json(result);
    } catch (error) {
      const status = error.message.includes("salah") ? 400 : 500;
      res.status(status).json({ message: error.message });
    }
  }
}

export default new AuthController();
