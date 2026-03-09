import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import authRepository from "./auth.repository.js";
import prisma from "../../common/config/prisma.js";
import notificationRepository from "../notification/notification.repository.js";

class AuthService {
  async register(username, password) {
    const existingUser = await authRepository.findByUsername(username);
    if (existingUser) {
      throw new Error("Username sudah terdaftar");
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const user = await authRepository.createUser({
      username,
      password: hashedPassword,
    });

    // Notifikasi Pendaftaran Berhasil
    await notificationRepository.createNotification(
      user.id,
      "🎉 Selamat Datang!",
      "Terima kasih telah bergabung di Anjay Store. Temukan produk digital terbaikmu di sini!",
      "SUCCESS",
    );

    return { id: user.id };
  }

  async login(username, password) {
    const user = await authRepository.findByUsername(username);
    if (!user) {
      throw new Error("Username atau password salah");
    }

    const isValid = await bcrypt.compare(password, user.password);
    if (!isValid) {
      throw new Error("Username atau password salah");
    }

    const token = jwt.sign(
      { id: user.id, username: user.username, role: user.role },
      process.env.JWT_SECRET,
      { expiresIn: "7d" },
    );

    const { password: _, ...userWithoutPassword } = user;
    // Tambahkan DL hasil kalkulasi dari WL (format float untuk presisi)
    userWithoutPassword.dl = userWithoutPassword.wl / 100;
    return { token, user: userWithoutPassword };
  }

  async getMe(userId) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }
    // Tambahkan DL hasil kalkulasi dari WL
    user.dl = user.wl / 100;
    return user;
  }

  async updateProfile(userId, { growid }) {
    const user = await authRepository.findById(userId);
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    if (growid) {
      const existingUser = await authRepository.findByGrowid(growid);
      if (existingUser) {
        throw new Error("GrowID sudah terdaftar");
      }
    }

    const updatedUser = await authRepository.updateUser(userId, { growid });
    updatedUser.dl = updatedUser.wl / 100;

    // Notifikasi Set GrowID
    if (growid) {
      await notificationRepository.createNotification(
        userId,
        "🆔 GrowID Diperbarui",
        `GrowID Anda telah berhasil diatur menjadi: ${growid}`,
        "SUCCESS",
      );
    }

    return updatedUser;
  }

  async changePassword(userId, { currentPassword, newPassword }) {
    // We need password for comparison
    const user = await prisma.user.findUnique({ where: { id: userId } });
    if (!user) {
      throw new Error("User tidak ditemukan");
    }

    const isValid = await bcrypt.compare(currentPassword, user.password);
    if (!isValid) {
      throw new Error("Password saat ini salah");
    }

    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await authRepository.updateUser(userId, { password: hashedPassword });

    // Notifikasi Ganti Password
    await notificationRepository.createNotification(
      userId,
      "🔐 Keamanan Akun",
      "Password Anda baru saja diubah. Jika bukan Anda yang melakukannya, segera hubungi admin.",
      "WARNING",
    );

    return { message: "Password berhasil diubah" };
  }
}

export default new AuthService();
