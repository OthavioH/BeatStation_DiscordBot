import { ApplicationCommandType, PermissionFlagsBits } from "discord.js";
import Command from "../../common/models/Command";
import SettingsController from "../../controllers/SettingsController";
import { prisma } from "../../db/prisma";
import { SocialMediaNameOption } from "./options/SocialMediaNameOption";
import { SocialMediaUsernameOption } from "./options/SocialMediaUsernameOption";

import userHasPermissions from "../../common/utils/utils";

const AddSocialMediaCommand: Command = {
  name: "add-social-media",
  description: "Add a social media account to be targeted by the bot",
  type: ApplicationCommandType.ChatInput,
  options: [SocialMediaNameOption, SocialMediaUsernameOption],
  defaultMemberPermissions: PermissionFlagsBits.BanMembers,
  run: async (client, interaction) => {
    try {
      if (userHasPermissions(interaction)) {
        const settingsController = new SettingsController(prisma);

        const socialMediaName = interaction.options.get("social-media-name");
        const socialMediaUsername = interaction.options.get(
          "social-media-username"
        );

        await settingsController.addNewSocialMedia({
          name: socialMediaName?.value as string,
          accountUsername: socialMediaUsername?.value as string,
        });

        await interaction.followUp({
          content: "Added " + socialMediaName?.value + " account",
          ephemeral: true,
        });
      } else {
        await interaction.followUp({
          content: "You don't have the permissions to do that.",
          ephemeral: true,
        });
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default AddSocialMediaCommand;
