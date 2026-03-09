import productService from "./product.service.js";

class ProductController {
  async getAll(req, res) {
    try {
      const products = await productService.getAll();
      res.json(products);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const product = await productService.getById(req.params.id);
      res.json(product);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const product = await productService.create(req.body);
      res.status(201).json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const product = await productService.update(req.params.id, req.body);
      res.json(product);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await productService.delete(req.params.id);
      res.json({ message: "Produk berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  // Stock Item Management
  async listStockItems(req, res) {
    try {
      const items = await productService.listStockItems(req.params.id);
      res.json(items);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async addStockItem(req, res) {
    try {
      const item = await productService.addStockItem(
        req.params.id,
        req.body.content,
      );
      res.status(201).json(item);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async deleteStockItem(req, res) {
    try {
      await productService.deleteStockItem(req.params.itemId);
      res.json({ message: "Item stok berhasil dihapus" });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ProductController();
