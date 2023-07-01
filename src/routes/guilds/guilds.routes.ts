import { Guild } from "discord.js";
import { FastifyInstance } from "fastify";
import client from "src/bot";
import { prisma } from "src/config/db/prisma";
import SettingsController from "src/controllers/SettingsController";
import { DisplayGUild } from "src/shared/models/DisplayGuild";

export default function GuildsRouter(fastify: FastifyInstance, options: any) {
  fastify.get("/guilds", async (request, reply) => {
    const settingsController = new SettingsController(prisma);
    const settingsList = await settingsController.getAllSettings();

    let guildList: DisplayGUild[] = [];
    for (const settings of settingsList) {
      const guild = client.guilds.cache.get(settings.guildId);

      if (guild) {
        guildList.push({
          id: guild.id,
          name: guild.name,
          icon: guild.iconURL(),
        });
      }
    }

    return reply.status(200).send(guildList);
  });
}
