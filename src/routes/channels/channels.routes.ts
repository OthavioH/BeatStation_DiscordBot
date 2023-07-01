import { FastifyInstance } from "fastify";
import { prisma } from "src/config/db/prisma";
import SettingsController from "src/controllers/SettingsController";

export default function ChannelsRouter(fastify: FastifyInstance, options: any) {
  fastify.get("/channels", async (request, reply) => {
    const settingsController = new SettingsController(prisma);
    const channels = await settingsController.getRegisteredChannels();
    return reply.status(200).send(channels);
  });
}
