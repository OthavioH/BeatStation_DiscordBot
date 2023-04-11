import {
  ApplicationCommandOptionData,
  ApplicationCommandOptionType,
} from "discord.js";

export const SocialMediaUsernameOption: ApplicationCommandOptionData = {
  name: "social-media-username",
  description: "The username of the social media you want to add",
  required: true,
  type: ApplicationCommandOptionType.String,
};
