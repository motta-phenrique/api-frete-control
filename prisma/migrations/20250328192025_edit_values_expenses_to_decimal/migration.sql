/*
  Warnings:

  - You are about to alter the column `value` on the `Expenses` table. The data in that column could be lost. The data in that column will be cast from `String` to `Decimal`.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freightId" TEXT NOT NULL,
    CONSTRAINT "Expenses_freightId_fkey" FOREIGN KEY ("freightId") REFERENCES "Freight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("createdAt", "freightId", "id", "name", "value") SELECT "createdAt", "freightId", "id", "name", "value" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
