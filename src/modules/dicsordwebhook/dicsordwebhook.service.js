import axios from "axios";

class DicsordWebhookService {
  async botstatusNotif(data) {
    const webhookUrl = "https://discord.com/api/webhooks/1482345247710121994/gM9PCUreY3TEGsFkMKBtbRhFIU1h4xrp3mhHrOhp1jMXAJ7u2je6eCFNZteh5l54WQX6/messages/1482348757088604170";

    const unixTimestamp = Math.floor(Date.now() / 1000);

    const bot1Status = data.bot1 ? "<a:onn:1246447949152649327> **ONLINE**" : "<a:off:1480149354273706076> **OFFLINE**";
    const bot2Status = data.bot2 ? "<a:onn:1246447949152649327> **ONLINE**" : "<a:off:1480149354273706076> **OFFLINE**";

    const embedColor = (data.bot1 && data.bot2) ? 65280 : 16711680;

    const payload = {
      embeds: [
        {
          title: "<a:gmSwag:1000768724548206622> STATUS MONITOR BOT",
          description: `**Bot GrowScan <:growscan:1030773231768055848>**\n└ Nama Bot: ${data.nameBot1}\n└ Status: ${bot1Status}\n\n` +
                       `**Bot Deposit <:DL:1030773168572477510>**\n└ Nama Bot: ${data.nameBot2}\n└ Status: ${bot2Status}`,
          color: embedColor,
          fields: [
            {
              name: "Di Perbarui Pada",
              // Menggunakan :f (f kecil) untuk format: 14 Maret 2026 21:13
              value: `<a:NA_Updates:879246105471230023> <t:${unixTimestamp}:f>`, 
              inline: false
            }
          ],
          footer: {
            text: "Anjay Store 🌍 https://anjay.fun"
          }
        }
      ]
    };

    try {
      await axios.patch(webhookUrl, payload);
      return { success: true, message: "Status Discord berhasil di-update!" };
    } catch (error) {
      return { success: false, message: "Gagal update status" };
    }
  }
}

export default new DicsordWebhookService();