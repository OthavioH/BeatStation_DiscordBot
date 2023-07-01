import { FastifyInstance } from "fastify";
import InstagramWebhooksRouter from "./webhooks/instagram.routes";
import GuildsRouter from "./guilds/guilds.routes";

export default async function routes(fastify: FastifyInstance, options: any) {
  fastify.get("/", async (request, reply) => {
    return reply.send("This API is the server of the BeatStation discord bot");
  });

  fastify.head("/status", async (request, reply) => {
    return reply.status(200).send("Success");
  });

  InstagramWebhooksRouter(fastify, options);
  GuildsRouter(fastify, options);
}
