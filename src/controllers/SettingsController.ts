import { BotSettings, PrismaClient } from "@prisma/client";
import IPost from "src/shared/models/IPost";
import ISocialMedia from "src/shared/models/SocialMedia";

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

  async getSettingsById(guildId: string): Promise<BotSettings | null> {
    const settings = await this.prismaClient.botSettings.findUnique({
      where: { guildId },
    });

    return settings;
  }

  async getAllSettings(): Promise<BotSettings[]> {
    return await this.prismaClient.botSettings.findMany({
      where: {
        channelId: {
          not: undefined,
        },
      },
    });
  }

  async registerNewChannel(guildId: string, channelId: string) {
    const isThereAnySettings = await this.getSettingsById(guildId);

    if (!isThereAnySettings) {
      return this.createNewSettings(guildId, channelId, undefined);
    }

    return await this.prismaClient.botSettings.update({
      data: {
        channelId: channelId,
      },
      where: {
        guildId,
      },
    });
  }

  async deleteSettings(guildId: string) {
    const guildFound = await this.prismaClient.botSettings.findUnique({
      where: {
        guildId,
      },
    });

    if (!guildFound) {
      return;
    }

    return await this.prismaClient.botSettings.delete({
      where: {
        guildId,
      },
    });
  }

  async createNewSettings(
    guildId: string,
    channelId?: string,
    roleId?: string
  ) {
    return await this.prismaClient.botSettings.create({
      data: {
        guildId,
        channelId: channelId ?? "",
        roleId: roleId ?? "",
      },
    });
  }

  async registerNewRole(guildId: string, roleId: string) {
    const isThereAnySettings = await this.getSettingsById(guildId);

    if (!isThereAnySettings) {
      return this.createNewSettings(guildId, undefined, roleId);
    }

    await this.prismaClient.botSettings.update({
      data: {
        roleId,
      },
      where: {
        guildId,
      },
    });
  }
}
