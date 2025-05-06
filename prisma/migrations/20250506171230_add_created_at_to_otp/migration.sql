-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_PasswordResetToken" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "code" TEXT NOT NULL,
    "expireAt" DATETIME NOT NULL,
    "userId" TEXT NOT NULL,
    "validated" BOOLEAN NOT NULL DEFAULT false,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT "PasswordResetToken_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User" ("id") ON DELETE CASCADE ON UPDATE CASCADE
);
INSERT INTO "new_PasswordResetToken" ("code", "expireAt", "id", "userId", "validated") SELECT "code", "expireAt", "id", "userId", "validated" FROM "PasswordResetToken";
DROP TABLE "PasswordResetToken";
ALTER TABLE "new_PasswordResetToken" RENAME TO "PasswordResetToken";
CREATE INDEX "PasswordResetToken_userId_idx" ON "PasswordResetToken"("userId");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;
