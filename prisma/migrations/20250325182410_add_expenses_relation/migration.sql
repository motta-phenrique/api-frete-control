/*
  Warnings:

  - Added the required column `userId` to the `Freight` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Freight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "destination" TEXT NOT NULL,
    "starting" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    CONSTRAINT "Freight_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Freight" ("client", "date", "destination", "id", "starting", "value") SELECT "client", "date", "destination", "id", "starting", "value" FROM "Freight";
DROP TABLE "Freight";
ALTER TABLE "new_Freight" RENAME TO "Freight";
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
