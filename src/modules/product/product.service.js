import productRepository from "./product.repository.js";

const VALID_MODES = ["IDR_ONLY", "DL_ONLY", "BOTH"];

class ProductService {
  async getAll() {
    return await productRepository.findAll();
  }

  async getById(id) {
    const product = await productRepository.findById(Number(id));
    if (!product) throw new Error("Produk tidak ditemukan");
    return product;
  }

  async create(data) {
    const {
      name,
      description,
      image,
      category,
      priceIdr,
      priceDl,
      priceMode,
      isActive,
      stock,
    } = data;

    if (!name) throw new Error("Nama produk wajib diisi");
    if (!VALID_MODES.includes(priceMode))
      throw new Error("Mode harga tidak valid");
    if (priceMode === "IDR_ONLY" && !priceIdr)
      throw new Error("Harga IDR wajib diisi");
    if (priceMode === "DL_ONLY" && !priceDl)
      throw new Error("Harga DL wajib diisi");
    if (priceMode === "BOTH" && (!priceIdr || !priceDl))
      throw new Error("Harga IDR dan DL wajib diisi");

    return await productRepository.create({
      name,
      description: description || null,
      image: image || null,
      category: category || "Umum",
      priceIdr: priceIdr ? Number(priceIdr) : null,
      priceDl: priceDl ? Number(priceDl) : null,
      priceMode: priceMode || "IDR_ONLY",
      isActive: isActive !== undefined ? Boolean(isActive) : true,
      stock: stock !== undefined ? Number(stock) : 0,
    });
  }

  async update(id, data) {
    await this.getById(id);
    const {
      name,
      description,
      image,
      category,
      priceIdr,
      priceDl,
      priceMode,
      isActive,
      stock,
    } = data;
    if (priceMode && !VALID_MODES.includes(priceMode))
      throw new Error("Mode harga tidak valid");

    return await productRepository.update(Number(id), {
      ...(name !== undefined && { name }),
      ...(description !== undefined && { description }),
      ...(image !== undefined && { image }),
      ...(category !== undefined && { category }),
      ...(priceIdr !== undefined && {
        priceIdr: priceIdr ? Number(priceIdr) : null,
      }),
      ...(priceDl !== undefined && {
        priceDl: priceDl ? Number(priceDl) : null,
      }),
      ...(priceMode !== undefined && { priceMode }),
      ...(isActive !== undefined && { isActive: Boolean(isActive) }),
      ...(stock !== undefined && { stock: Number(stock) }),
    });
  }

  async delete(id) {
    await this.getById(id);
    return await productRepository.delete(Number(id));
  }

  // Stock Management Logic
  async listStockItems(productId) {
    await this.getById(productId);
    return await productRepository.getStockItems(Number(productId));
  }

  async addStockItem(productId, content) {
    await this.getById(productId);
    if (!content) throw new Error("Isi produk wajib diisi");
    return await productRepository.addStockItem(Number(productId), content);
  }

  async deleteStockItem(itemId) {
    return await productRepository.deleteStockItem(Number(itemId));
  }
}

export default new ProductService();
