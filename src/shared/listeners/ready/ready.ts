import { Client } from "discord.js";

export default async function ready(c: Client) {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
}
