import { BotSettings, PrismaClient } from "@prisma/client";
import IPost from "src/common/models/IPost";
import ISocialMedia from "src/common/models/SocialMedia";

export default class SettingsController {
  private prismaClient: PrismaClient;
  private static authToken: string;

  constructor(prismaClient: PrismaClient) {
    this.prismaClient = prismaClient;
  }

  async setToken(token: string) {
    SettingsController.authToken = token;
  }

  static async getToken() {
    return this.authToken;
  }

  async getSettings(): Promise<BotSettings | null> {
    return await this.prismaClient.botSettings.findFirst();
  }

  async createNewSettings() {
    const isThereAnySettings = await this.getSettings();

    if (!isThereAnySettings) {
      await this.prismaClient.botSettings.create({
        data: {},
      });
    }
  }

  async changeUpdatingTime(newTime: number) {
    const settings = await this.getSettings();

    await this.prismaClient.botSettings.update({
      data: { updatingTime: newTime },
      where: { id: settings?.id ?? 1 },
    });
  }

  async addNewSocialMedia(socialMedia: ISocialMedia) {
    const settings = await this.getSettings();

    const newSocialMedia = await this.prismaClient.socialMedia.create({
      data: {
        name: socialMedia.name,
        accountUsername: socialMedia.accountUsername,
        botSettingsId: settings?.id ?? 1,
      },
    });

    settings!.socialMediaIds = JSON.stringify(
      JSON.parse(settings!.socialMediaIds).push(newSocialMedia.id)
    );

    await this.prismaClient.botSettings.update({
      data: { socialMediaIds: settings!.socialMediaIds },
      where: { id: settings!.id },
    });
  }

  async removeSocialMedia(socialMediaId: number) {
    const settings = await this.getSettings();
    const socialMediaIds = JSON.parse(settings!.socialMediaIds);

    const foundSocialMediaIndex = socialMediaIds.findIndex(
      (id: number) => id === socialMediaId
    );

    if (foundSocialMediaIndex !== -1) {
      socialMediaIds.splice(foundSocialMediaIndex, 1);
    }

    settings!.socialMediaIds = JSON.stringify(socialMediaIds);

    await this.prismaClient.botSettings.update({
      data: { socialMediaIds: settings!.socialMediaIds },
      where: { id: settings!.id },
    });

    await this.prismaClient.socialMedia.delete({
      where: { id: socialMediaId },
    });
  }

  async addNewPost(post: IPost, socialMediaName: string) {
    const socialMedia = await this.prismaClient.socialMedia.findFirst({
      where: { name: socialMediaName },
    });

    if (socialMedia) {
      const newPost = await this.prismaClient.post.create({
        data: {
          title: post.title,
          url: post.url,
          date: post.date,
          socialMediaId: socialMedia.id,
        },
      });

      const newPostsIds = JSON.parse(socialMedia.postsIds).push(newPost.id);

      await this.prismaClient.socialMedia.update({
        data: { postsIds: JSON.stringify(newPostsIds) },
        where: { id: socialMedia.id },
      });
    }
  }
}
