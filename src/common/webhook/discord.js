const sendDiscordNotification = async (data) => {
  const webhookUrl = process.env.DISCORD_WEBHOOK_URL;
  const bannerUrl = "https://ik.imagekit.io/8zzj11dsp/porto/Screenshot%20from%202026-03-10%2008-39-42.png";
  
  try {
    await fetch(webhookUrl, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        embeds: [{
          title: "🟢 TOP UP BERHASIL",
          url: "https://anjay.fun",
          color: 0x10b981,
          description: "Pesanan telah diproses secara otomatis oleh sistem [anjay.fun](https://anjay.fun)",
          thumbnail: {
            url: "https://i.ibb.co/p3P8Q5B/DL.png"
          },
          // --- GAMBAR MEMANJANG DARI IMAGEKIT ---
          image: {
            url: bannerUrl
          },
          fields: [
            {
              name: "👤 Customer",
              value: `**${data.name || "User"}**`,
              inline: true
            },
            {
              name: "<:dl:1158355446004994162> Jumlah",
              value: `**${data.totalDL} DL**`,
              inline: true
            },
            {
              name: "🛠️ Status Deposit",
              value: "Growtopia 👌 ONLINE",
              inline: false
            }
          ],
          footer: {
            text: "Anjay Store Logging System • anjay.fun",
            icon_url: "https://api.dicebear.com/7.x/avataaars/svg?seed=Anjay"
          },
          timestamp: new Date()
        }]
      })
    });
  } catch (error) {
    console.error("Gagal kirim ke Discord:", error);
  }
};

export default sendDiscordNotification