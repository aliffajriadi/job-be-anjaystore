-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Product" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "image" TEXT,
    "category" TEXT NOT NULL DEFAULT 'Umum',
    "stock" INTEGER NOT NULL DEFAULT 0,
    "priceIdr" INTEGER,
    "priceDl" INTEGER,
    "priceMode" TEXT NOT NULL DEFAULT 'IDR_ONLY',
    "isActive" BOOLEAN NOT NULL DEFAULT true,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Product" ("createdAt", "description", "id", "image", "isActive", "name", "priceDl", "priceIdr", "priceMode", "stock", "updatedAt") SELECT "createdAt", "description", "id", "image", "isActive", "name", "priceDl", "priceIdr", "priceMode", "stock", "updatedAt" FROM "Product";
DROP TABLE "Product";
ALTER TABLE "new_Product" RENAME TO "Product";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
