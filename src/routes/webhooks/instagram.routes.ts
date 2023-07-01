import { TextChannel } from "discord.js";
import { FastifyInstance } from "fastify";
import client, { settingsController } from "src/bot";
import InstagramPostMessage from "src/shared/messages/InstagramPostMessage";
import InstagramPostZod from "src/shared/models/zod/InstagramPostZod";

export default function InstagramWebhooksRouter(
  fastify: FastifyInstance,
  options: any
) {
  fastify.post("/webhook/instagram/newPost", async (request, reply) => {
    try {
      if (client) {
        request.log.info("Received Instagram new post");

        const response = InstagramPostZod().parse(request.body);

        const channelIdList = await settingsController.getRegisteredChannels();

        for (const channelId of channelIdList) {
          const channel = (await client.channels.fetch(
            channelId
          )) as TextChannel;

          if (channel) {
            const roleId = await settingsController.getRoleId(channel.guild.id);

            await channel
              .send(InstagramPostMessage(response, client, roleId))
              .then(() => {
                request.log.info("Success!! Posted on discord");
              });

            await new Promise((resolve) => setTimeout(resolve, 3000));
          }
        }

        return reply.status(200).send("Posting on discord...");
      }
    } catch (error) {
      fastify.log.error(error);
      return reply.status(500).send("Internal Server Error");
    }
  });
}
