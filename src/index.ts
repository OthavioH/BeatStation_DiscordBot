import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import ListenerController from "./controllers/ListenerController";
import SettingsController from "./controllers/SettingsController";
import { prisma } from "./db/prisma";

import fastify from "fastify";

dotenv.config();

const app = fastify({ logger: true });

app.get("/", async (request, reply) => {
  return { hello: "world" };
});

app.listen({
  host: "0.0.0.0",
  port: process.env.PORT ? Number(process.env.PORT) : 3333,
});

try {
  const token = process.env.BOT_TOKEN;

  const client = new Client({
    intents: [GatewayIntentBits.Guilds],
  });

  const settingsController = new SettingsController(prisma);

  client.login(token).then(() => {
    console.log("Logged in.");

    const listenerController = new ListenerController(client);
    listenerController.startAllListeners();

    settingsController.createNewSettings();
  });

  console.log("Bot started.");
} catch (error) {
  console.log(error);
}
