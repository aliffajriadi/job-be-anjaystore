import topupService from "./topup.service.js";

class TopupController {
  async addBalance(req, res) {
    try {
      const { growid, totalWL, key } = req.body;

      if (!growid || totalWL === undefined || !key) {
        return res.status(400).json({
          success: false,
          message: "growid, totalWL, and key are required",
        });
      }

      const result = await topupService.addBalanceViaGrowtopia(
        growid,
        parseInt(totalWL),
        key,
      );

      return res.status(200).json({
        success: true,
        message: "Balance added successfully",
        data: {
          growid: result.growid,
          newBalanceWL: result.wl,
        },
      });
    } catch (error) {
      console.error("Topup Error:", error.message);
      return res.status(400).json({
        success: false,
        message: error.message,
      });
    }
  }
}

export default new TopupController();
