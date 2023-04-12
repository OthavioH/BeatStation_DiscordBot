-- CreateTable
CREATE TABLE "Post" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "url" TEXT NOT NULL,
    "date" DATETIME NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "socialMediaId" INTEGER,
    CONSTRAINT "Post_socialMediaId_fkey" FOREIGN KEY ("socialMediaId") REFERENCES "SocialMedia" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_SocialMedia" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL,
    "accountUsername" TEXT NOT NULL,
    "postsIds" TEXT NOT NULL DEFAULT '[]',
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL,
    "botSettingsId" INTEGER,
    CONSTRAINT "SocialMedia_botSettingsId_fkey" FOREIGN KEY ("botSettingsId") REFERENCES "BotSettings" ("id") ON DELETE SET NULL ON UPDATE CASCADE
);
INSERT INTO "new_SocialMedia" ("accountUsername", "botSettingsId", "createdAt", "id", "name", "updatedAt") SELECT "accountUsername", "botSettingsId", "createdAt", "id", "name", "updatedAt" FROM "SocialMedia";
DROP TABLE "SocialMedia";
ALTER TABLE "new_SocialMedia" RENAME TO "SocialMedia";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
