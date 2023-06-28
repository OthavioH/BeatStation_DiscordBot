import { EmbedBuilder } from "@discordjs/builders";
import { TextChannel } from "discord.js";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import client, { settingsController } from "src/bot";
import InstagramPostZod from "src/shared/models/zod/InstagramPostZod";
import InstagramPostDomain from "src/shared/models/domain/InstagramPostDomain";
import InstagramPostEmbed from "src/shared/embeds/InstagramPostEmbed";
import InstagramPostMessage from "src/shared/messages/InstagramPostMessage";

export default async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, reply) => {
    return reply.send("This API is the server of the BeatStation discord bot");
  });

  fastify.head("/status", async (request, reply) => {
    return reply.status(200).send("Success");
  });

  fastify.post("/webhook/instagram/newPost", async (request, reply) => {
    try {
      if (client) {
        request.log.info("Received Instagram new post");

        const response = InstagramPostZod().parse(request.body);

        const channelIdList = await settingsController.getRegisteredChannels();

        channelIdList.forEach(async (channelId) => {
          const channel = client.channels.cache.get(channelId) as TextChannel;

          if (channel) {
            const roleId = await settingsController.getRoleId(channel.guild.id);

            await channel
              .send(InstagramPostMessage(response, client, roleId))
              .then(() => {
                request.log.info("Success!! Posted on discord");
              });
          }
        });

        return reply.status(200).send("Posting on discord...");
      }
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send("Internal Server Error");
    }
  });
}
