import dotenv from "dotenv";
import express, { Request } from "express";
import { Client, GatewayIntentBits } from "discord.js";
import ListenerController from "./controllers/ListenerController";
import SettingsController from "./controllers/SettingsController";
import { prisma } from "./db/prisma";
import getOAuth2 from "./lib/OAuth2";

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

  const app = express();

  app.get("/", async (req: Request, res) => {
    console.log(req);
    try {
      const oauth2 = await getOAuth2(req.query.code as string);
      settingsController.setToken(oauth2.access_token);
      return res.send(oauth2).status(200);
    } catch (error) {
      return res.sendStatus(400);
    }
  });

  app.listen(3000, () => {
    console.log("App listening on port 3000");
  });
} catch (error) {
  console.log(error);
}
