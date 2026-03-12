import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const moduleName = process.argv[2];

if (!moduleName) {
  console.error(
    "❌ Mohon berikan nama modul. Contoh: npm run makeModule product",
  );
  process.exit(1);
}

const lowercaseModule = moduleName.toLowerCase();
const pascalCaseModule =
  moduleName.charAt(0).toUpperCase() + moduleName.slice(1);
const modulesDir = path.join(__dirname, "../src/modules", lowercaseModule);

// Cek jika modul sudah ada
if (fs.existsSync(modulesDir)) {
  console.error(`❌ Modul "${lowercaseModule}" sudah ada!`);
  process.exit(1);
}

// Buat direktori modul
fs.mkdirSync(modulesDir, { recursive: true });

// Template untuk Repository
const repositoryTemplate = `import prisma from '../../common/config/prisma.js';

class ${pascalCaseModule}Repository {
  async findAll() {
    // return await prisma.${lowercaseModule}.findMany();
  }

  async findById(id) {
    // return await prisma.${lowercaseModule}.findUnique({ where: { id } });
  }

  async create(data) {
    // return await prisma.${lowercaseModule}.create({ data });
  }

  async update(id, data) {
    // return await prisma.${lowercaseModule}.update({ where: { id }, data });
  }

  async delete(id) {
    // return await prisma.${lowercaseModule}.delete({ where: { id } });
  }
}

export default new ${pascalCaseModule}Repository();
`;

// Template untuk Service (Business Logic)
const serviceTemplate = `import ${lowercaseModule}Repository from './${lowercaseModule}.repository.js';

class ${pascalCaseModule}Service {
  async getAll() {
    return await ${lowercaseModule}Repository.findAll();
  }

  async getById(id) {
    const data = await ${lowercaseModule}Repository.findById(Number(id));
    if (!data) throw new Error('${pascalCaseModule} tidak ditemukan');
    return data;
  }

  async create(data) {
    // Tambahkan validasi di sini
    return await ${lowercaseModule}Repository.create(data);
  }

  async update(id, data) {
    await this.getById(id);
    return await ${lowercaseModule}Repository.update(Number(id), data);
  }

  async delete(id) {
    await this.getById(id);
    return await ${lowercaseModule}Repository.delete(Number(id));
  }
}

export default new ${pascalCaseModule}Service();
`;

// Template untuk Controller
const controllerTemplate = `import ${lowercaseModule}Service from './${lowercaseModule}.service.js';

class ${pascalCaseModule}Controller {
  async getAll(req, res) {
    try {
      const data = await ${lowercaseModule}Service.getAll();
      res.json(data);
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

  async getById(req, res) {
    try {
      const data = await ${lowercaseModule}Service.getById(req.params.id);
      res.json(data);
    } catch (error) {
      res.status(404).json({ message: error.message });
    }
  }

  async create(req, res) {
    try {
      const data = await ${lowercaseModule}Service.create(req.body);
      res.status(201).json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async update(req, res) {
    try {
      const data = await ${lowercaseModule}Service.update(req.params.id, req.body);
      res.json(data);
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }

  async delete(req, res) {
    try {
      await ${lowercaseModule}Service.delete(req.params.id);
      res.json({ message: '${pascalCaseModule} berhasil dihapus' });
    } catch (error) {
      res.status(400).json({ message: error.message });
    }
  }
}

export default new ${pascalCaseModule}Controller();
`;

// Template untuk Routes
const routesTemplate = `import express from 'express';
import ${lowercaseModule}Controller from './${lowercaseModule}.controller.js';

const router = express.Router();

router.get('/', ${lowercaseModule}Controller.getAll.bind(${lowercaseModule}Controller));
router.get('/:id', ${lowercaseModule}Controller.getById.bind(${lowercaseModule}Controller));
router.post('/', ${lowercaseModule}Controller.create.bind(${lowercaseModule}Controller));
router.put('/:id', ${lowercaseModule}Controller.update.bind(${lowercaseModule}Controller));
router.delete('/:id', ${lowercaseModule}Controller.delete.bind(${lowercaseModule}Controller));

export default router;
`;

// Hasilkan file
const files = [
  { name: `${lowercaseModule}.repository.js`, content: repositoryTemplate },
  { name: `${lowercaseModule}.service.js`, content: serviceTemplate },
  { name: `${lowercaseModule}.controller.js`, content: controllerTemplate },
  { name: `${lowercaseModule}.routes.js`, content: routesTemplate },
];

files.forEach((file) => {
  fs.writeFileSync(path.join(modulesDir, file.name), file.content);
  console.log(`✅ File dibuat: src/modules/${lowercaseModule}/${file.name}`);
});

console.log(`\n🚀 Modul "${lowercaseModule}" berhasil dibuat!`);
console.log(
  `Jangan lupa untuk meregistrasikan router "${lowercaseModule}" di main index.js atau core router!`,
);
