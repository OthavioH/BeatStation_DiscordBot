/*
  Warnings:

  - Added the required column `roleId` to the `BotSettings` table without a default value. This is not possible if the table is not empty.

*/
-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_BotSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "roleId" TEXT NOT NULL,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_BotSettings" ("channelId", "createdAt", "guildId", "id", "updatedAt") SELECT "channelId", "createdAt", "guildId", "id", "updatedAt" FROM "BotSettings";
DROP TABLE "BotSettings";
ALTER TABLE "new_BotSettings" RENAME TO "BotSettings";
CREATE UNIQUE INDEX "BotSettings_roleId_key" ON "BotSettings"("roleId");
CREATE UNIQUE INDEX "BotSettings_guildId_key" ON "BotSettings"("guildId");
CREATE UNIQUE INDEX "BotSettings_channelId_key" ON "BotSettings"("channelId");
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
