import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from "discord.js";

export const timeCooldownOption: ApplicationCommandOptionData = {
  name: "time-in-seconds",
  description: "The time in seconds for the cooldown",
  required: true,
  type: ApplicationCommandOptionType.Integer,
};
