import dotenv from "dotenv";
import { Client, GatewayIntentBits } from "discord.js";
import ListenerController from "./controllers/ListenerController";
import SettingsController from "./controllers/SettingsController";
import { prisma } from "./db/prisma";

dotenv.config();

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
