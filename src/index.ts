import dotenv from "dotenv";

import fastify from "fastify";
import cors from "@fastify/cors";
import client from "./bot";
import SettingsController from "./controllers/SettingsController";

dotenv.config();

const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
});

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.post("/webhook/instagram/newPost", async (request, reply) => {
  console.log(request.body);

  const permalink = (request.body as any).permalink as string;

  const channelId = (await SettingsController.getChannel()) ?? "";
  const channel = client.channels.cache.get(channelId);
  if (channel) {
    channel.client.user.send(`New post on Instagram! ${permalink}`);
  }
  reply.status(200);
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
