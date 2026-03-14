import dicsordwebhookService from './dicsordwebhook.service.js';

class DicsordWebhookController {
  

  // async getAll(req, res) {
  //   try {
  //     const data = await dicsordwebhookService.getAll();
  //     res.json(data);
  //   } catch (error) {
  //     res.status(500).json({ message: error.message });
  //   }
  // }

  // async getById(req, res) {
  //   try {
  //     const data = await dicsordwebhookService.getById(req.params.id);
  //     res.json(data);
  //   } catch (error) {
  //     res.status(404).json({ message: error.message });
  //   }
  // }

  // async create(req, res) {
  //   try {
  //     const data = await dicsordwebhookService.create(req.body);
  //     res.status(201).json(data);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // async update(req, res) {
  //   try {
  //     const data = await dicsordwebhookService.update(req.params.id, req.body);
  //     res.json(data);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // async delete(req, res) {
  //   try {
  //     await dicsordwebhookService.delete(req.params.id);
  //     res.json({ message: 'DicsordWebhook berhasil dihapus' });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  async botstatusNotif(req, res) {
    const apikey = req.query.apikey;
    if (apikey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: "Unauthorized" });
    }
    try {
      const data = await dicsordwebhookService.botstatusNotif(req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new DicsordWebhookController();
