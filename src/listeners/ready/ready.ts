import { Client, REST, Routes } from "discord.js";
import commandList from "src/commands/commandList";
import token from "src/config/token";

export default async function ready(c: Client) {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
}
