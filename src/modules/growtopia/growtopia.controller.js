import growtopiaService from './growtopia.service.js';

class GrowtopiaController {
  async getAll(req, res) {
    const { world, discordID, apikey } = req.query;
    if (apikey !== process.env.ADMIN_KEY) {
      return res.status(401).json({ message: 'Unauthorized' });
    }
    if (!world || !discordID) {
      return res.status(400).json({ message: 'Missing required parameters: world and discordID' });
    }
    try {
      const data = await growtopiaService.getAll(world, discordID);
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  // async getById(req, res) {
  //   try {
  //     const data = await growtopiaService.getById(req.params.id);
  //     res.json(data);
  //   } catch (error) {
  //     res.status(404).json({ message: error.message });
  //   }
  // }

  // async create(req, res) {
  //   try {
  //     const data = await growtopiaService.create(req.body);
  //     res.status(201).json(data);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // async update(req, res) {
  //   try {
  //     const data = await growtopiaService.update(req.params.id, req.body);
  //     res.json(data);
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }

  // async delete(req, res) {
  //   try {
  //     await growtopiaService.delete(req.params.id);
  //     res.json({ message: 'Growtopia berhasil dihapus' });
  //   } catch (error) {
  //     res.status(400).json({ message: error.message });
  //   }
  // }
}

export default new GrowtopiaController();
