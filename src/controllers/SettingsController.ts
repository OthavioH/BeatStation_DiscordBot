import { BotSettings, PrismaClient } from "@prisma/client";
import IPost from "src/common/models/IPost";
import ISocialMedia from "src/common/models/SocialMedia";

export default class SettingsController {
  private prismaClient: PrismaClient;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async getRegisteredChannels(): Promise<string[]> {
    const settings = await this.prismaClient.botSettings.findMany({
      where: {
        channelId: {
          not: undefined,
        },
      },
    });

    return settings.map((setting) => setting.channelId);
  }

  async getRoleId(guildId: string): Promise<string | null> {
    const settings = await this.prismaClient.botSettings.findUnique({
      where: { guildId },
    });

    return settings?.roleId ?? null;
  }

  async getSettings(guildId: string): Promise<BotSettings | null> {
    const settings = await this.prismaClient.botSettings.findUnique({
      where: { guildId },
    });

    return settings;
  }

  async createNewSettings(
    guildId: string,
    channelId?: string,
    roleId?: string
  ) {
    const isThereAnySettings = await this.getSettings(guildId);

    if (!isThereAnySettings) {
      return await this.prismaClient.botSettings.create({
        data: {
          guildId,
          channelId: channelId ?? "",
          roleId: roleId ?? "",
        },
      });
    }

    if (roleId) {
      return await this.prismaClient.botSettings.update({
        data: {
          roleId: roleId,
        },
        where: {
          guildId,
        },
      });
    } else if (channelId) {
      return await this.prismaClient.botSettings.update({
        data: {
          channelId: channelId,
        },
        where: {
          guildId,
        },
      });
    }
  }
}
