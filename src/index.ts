import dotenv from "dotenv";
import { Client } from "discord.js";

dotenv.config();

try {
  const token = process.env.BOT_TOKEN;
  console.log(token);

  const client = new Client({
    intents: [],
  });

  client.login(token).then;

  console.log("Bot started.");
} catch (error) {
  console.log(error);
}
