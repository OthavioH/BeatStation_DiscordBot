-- CreateTable
CREATE TABLE "BotSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "guildId" TEXT NOT NULL,
    "channelId" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);

-- CreateIndex
CREATE UNIQUE INDEX "BotSettings_guildId_key" ON "BotSettings"("guildId");

-- CreateIndex
CREATE UNIQUE INDEX "BotSettings_channelId_key" ON "BotSettings"("channelId");
