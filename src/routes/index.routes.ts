import { EmbedBuilder } from "@discordjs/builders";
import {
  APIMessageActionRowComponent,
  ActionRowBuilder,
  ButtonBuilder,
  ButtonStyle,
  TextChannel,
} from "discord.js";
import { FastifyInstance } from "fastify";
import { z } from "zod";

import client, { settingsController } from "src/bot";

export default async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, reply) => {
    return reply.send("This API is the server of the BeatStation discord bot");
  });

  fastify.head("/status", async (request, reply) => {
    return reply.status(200).send("Success");
  });

  fastify.post("/webhook/instagram/newPost", async (request, reply) => {
    if (client) {
      const response = z
        .object({
          permalink: z.string(),
          imageUrl: z.string(),
          caption: z.string(),
          mediaType: z.string(),
          thumbnailUrl: z.string(),
        })
        .parse(request.body);

      const { permalink, imageUrl, caption, mediaType, thumbnailUrl } =
        response;

      const channelIdList = await settingsController.getRegisteredChannels();

      channelIdList.forEach(async (channelId) => {
        const channel = client.channels.cache.get(channelId) as TextChannel;

        if (channel) {
          const roleId = await settingsController.getRoleId(channel.guild.id);
          const embed: EmbedBuilder = new EmbedBuilder({
            title: caption ?? "Novo post no Instagram",
            color: 8600244,
            video: mediaType === "VIDEO" ? { url: imageUrl } : undefined,
            image: mediaType === "IMAGE" ? { url: imageUrl } : undefined,
            thumbnail: thumbnailUrl ? { url: thumbnailUrl } : undefined,
            url: permalink,
            author: {
              name: "BeatStation",
              url: "https://www.instagram.com/beatstation777/",
              icon_url: client.user?.displayAvatarURL(),
            },
            footer: {
              text: "Instagram",
            },
          });

          await channel.send({
            content: `:60_Instagram: **Post novo no Instagram do BeatStation!!**\n\n<@&${roleId}>`,
            embeds: [embed],
          });
        }
      });

      return reply.status(200).send("Posting on discord...");
    }
  });
}
