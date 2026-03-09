import topupRepository from "./topup.repository.js";
import { getIo } from "../../common/config/socket.js";
import notificationRepository from "../notification/notification.repository.js";

class TopupService {
  async addBalanceViaGrowtopia(growid, totalWL, key) {
    // 1. Validasi API Key

    if (key !== process.env.ADMIN_KEY) {
      throw new Error("Invalid API Key");
    }

    // 2. Cari User berdasarkan GrowID
    console.log(`🔍 [Topup] Searching for GrowID: ${growid}`);
    const user = await topupRepository.findByGrowid(growid);
    if (!user) {
      console.warn(`⚠️ [Topup] User not found for GrowID: ${growid}`);
      throw new Error(`User with GrowID ${growid} not found`);
    }
    console.log(`✅ [Topup] User found: ${user.username} (ID: ${user.id})`);

    // 3. Tambahkan Saldo (Unit WL)
    const updatedUser = await topupRepository.addWLBalance(user.id, totalWL);

    // Hitung DL untuk tampilan (Konversi WL ke DL: 100 WL = 1 DL)
    const totalDLFixed = (totalWL / 100).toFixed(2);
    const currentDL = (updatedUser.wl / 100).toFixed(2);

    console.log(
      `💰 [Topup] Balance updated for ${user.username}: ${updatedUser.wl} WL (+${totalWL} WL | +${totalDLFixed} DL)`,
    );

    // 4. Emit ke WebSocket untuk real-time update di FE
    const io = getIo();
    const balanceUpdateKey = `balance-updated-${user.id}`;
    console.log(`📡 [Topup] Emitting update to: ${balanceUpdateKey}`);

    io.emit(balanceUpdateKey, {
      wl: updatedUser.wl,
      dl: parseFloat(currentDL), // Kirim sebagai number (float)
      balance: updatedUser.balance,
      message: `🎉 Berhasil menambahkan ${totalDLFixed} DL (${totalWL} WL) ke akun kamu!`,
    });

    // Juga emit event umum jika perlu (opsional)
    io.emit("new-topup", {
      growid: growid,
      amountWl: totalWL,
      amountDl: parseFloat(totalDLFixed),
      timestamp: new Date(),
    });

    // Tambahkan Notifikasi Transaksi
    await notificationRepository.createNotification(
      user.id,
      "💰 Top Up Berhasil",
      `Selamat! Saldo sebesar ${totalDLFixed} DL (${totalWL} WL) telah berhasil ditambahkan ke akun Anda.`,
      "SUCCESS",
    );

    return updatedUser;
  }
}

export default new TopupService();
