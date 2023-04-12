-- CreateTable
CREATE TABLE "BotSettings" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "prefix" TEXT NOT NULL DEFAULT '!',
    "updatingTime" INTEGER NOT NULL DEFAULT 7200,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "authorizedRolesIds" TEXT NOT NULL DEFAULT '[]',
    "socialMediaIds" TEXT NOT NULL DEFAULT '[]'
);

-- CreateTable
CREATE TABLE "AuthorizedRole" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "botSettingsId" INTEGER,
    CONSTRAINT "AuthorizedRole_botSettingsId_fkey" FOREIGN KEY ("botSettingsId") REFERENCES "BotSettings" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- CreateTable
CREATE TABLE "SocialMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "accountUsername" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "botSettingsId" INTEGER,
    CONSTRAINT "SocialMedia_botSettingsId_fkey" FOREIGN KEY ("botSettingsId") REFERENCES "BotSettings" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
