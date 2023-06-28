import { SlashCommandBuilder } from "discord.js";

export default interface Command {
  data: SlashCommandBuilder | Omit<any, any>;
  execute: (interaction: any) => Promise<void>;
}
