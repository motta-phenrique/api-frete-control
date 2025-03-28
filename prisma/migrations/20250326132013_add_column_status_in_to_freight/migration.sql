/*
  Warnings:

  - You are about to drop the column `date` on the `Expenses` table. All the data in the column will be lost.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freightId" TEXT NOT NULL,
    CONSTRAINT "Expenses_freightId_fkey" FOREIGN KEY ("freightId") REFERENCES "Freight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Expenses" ("freightId", "id", "name", "value") SELECT "freightId", "id", "name", "value" FROM "Expenses";
DROP TABLE "Expenses";
ALTER TABLE "new_Expenses" RENAME TO "Expenses";
CREATE TABLE "new_Freight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "destination" TEXT NOT NULL,
    "starting" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "status" TEXT NOT NULL DEFAULT 'PENDING',
    "userId" TEXT NOT NULL,
    CONSTRAINT "Freight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Freight" ("client", "date", "destination", "id", "starting", "userId", "value") SELECT "client", "date", "destination", "id", "starting", "userId", "value" FROM "Freight";
DROP TABLE "Freight";
ALTER TABLE "new_Freight" RENAME TO "Freight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
