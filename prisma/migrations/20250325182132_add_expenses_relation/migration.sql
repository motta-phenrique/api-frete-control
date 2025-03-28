-- CreateTable
CREATE TABLE "Freight" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "client" TEXT NOT NULL,
    "value" DECIMAL NOT NULL,
    "destination" TEXT NOT NULL,
    "starting" TEXT NOT NULL,
    "date" DATETIME NOT NULL
);

-- CreateTable
CREATE TABLE "Expenses" (
    "id" TEXT NOT NULL PRIMARY KEY,
    "name" TEXT NOT NULL,
    "value" TEXT NOT NULL,
    "date" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "freightId" TEXT NOT NULL,
    CONSTRAINT "Expenses_freightId_fkey" FOREIGN KEY ("freightId") REFERENCES "Freight" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
