import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from "discord.js";

export const SocialMediaNameOption: ApplicationCommandOptionData = {
  name: "social-media-name",
  description: "The name of the social media you want to add",
  required: true,
  type: ApplicationCommandOptionType.String,
};
