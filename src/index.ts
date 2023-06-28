import dotenv from "dotenv";

import fastify from "fastify";
import cors from "@fastify/cors";
import client, { settingsController } from "./bot";
import SettingsController from "./controllers/SettingsController";
import {
  Embed,
  EmbedBuilder,
  MessageCreateOptions,
  MessagePayload,
  TextChannel,
} from "discord.js";

dotenv.config();

const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
});

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.head("/status", async (request, reply) => {
  return reply.status(200).send("Success");
});

app.post("/webhook/instagram/newPost", async (request, reply) => {
  if (client) {
    const { permalink, imageUrl, caption, mediaType, thumbnailUrl } =
      request.body as any;

    const channelIdList = await settingsController.getRegisteredChannels();

    channelIdList.forEach(async (channelId) => {
      const channel = client.channels.cache.get(channelId) as TextChannel;

      if (channel) {
        const roleId = await settingsController.getRoleId(channel.guild.id);
        const embed: EmbedBuilder = new EmbedBuilder()
          .setTitle(caption ?? "Novo post no Instagram")
          .setDescription(permalink)
          .setImage(imageUrl)
          .setColor(8600244)
          .setFooter({
            text: "Instagram",
          })
          .setAuthor({
            name: "BeatStation",
            url: "https://www.instagram.com/beatstation777/",
          });
        thumbnailUrl && embed.setThumbnail(thumbnailUrl);

        await channel.send({
          content: `:60_Instagram: **Post novo no Instagram do BeatStation!!**\n\n<@&${roleId}>`,
          embeds: [embed],
        });
      }
    });

    return reply.status(200).send("Success");
  }
});

app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  },
  (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    client.isReady();

    console.log("Bot started.");
  }
);
