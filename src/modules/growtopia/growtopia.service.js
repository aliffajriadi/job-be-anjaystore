import axios from "axios";

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

class GrowtopiaService {
  constructor() {
    this.isProcessing = false; // Penanda apakah bot sedang sibuk scan
  }

  async getAll(world, discordID) {
    // Jika sedang sibuk, langsung lempar error (ditolak)
    if (this.isProcessing) {
      throw new Error("BOT_BUSY");
    }

    try {
      this.isProcessing = true; // Set jadi sibuk
      console.log(`[Scan] Memproses world: ${world} (User: ${discordID})`);

      const apikey = process.env.ADMIN_KEY;
      const response = await axios.get(
        `https://api-growtopia.anjay.fun/scan?world=${world}&apikey=${apikey}`,
        { responseType: "text" },
      );

      const cleanData = response.data.replace(/:\s*Internal\s*\[/g, ": [");

      const result = JSON.parse(cleanData);

      return result;
    } catch (error) {
      console.error(`[Scan Error] ${world}:`, error.message);
      throw error;
    } finally {
      await sleep(2000);
      this.isProcessing = false; // Set kembali jadi santai setelah selesai/error
    }
  }
}

export default new GrowtopiaService();
