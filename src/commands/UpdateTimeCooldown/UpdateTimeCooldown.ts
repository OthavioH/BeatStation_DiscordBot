import {
  ApplicationCommandType,
  CommandInteraction,
  PermissionFlagsBits,
} from "discord.js";
import Command from "../../common/models/Command";
import { timeCooldownOption } from "./options/timeCooldownOption";
import SettingsController from "../../controllers/SettingsController";
import { prisma } from "../../db/prisma";

import userHasPermissions from "../../common/utils/utils";

const UpdateTimeCooldownCommand: Command = {
  name: "update-time-cooldown",
  type: ApplicationCommandType.ChatInput,
  description: "Updates the verification time cooldown (in seconds)",
  defaultMemberPermissions: PermissionFlagsBits.ChangeNickname,
  options: [timeCooldownOption],
  run: async (client, interaction: CommandInteraction) => {
    try {
      if (userHasPermissions(interaction)) {
        const settingsController = new SettingsController(prisma);
        const settings = await settingsController.getSettings();

        if (settings) {
          const timeCooldown = interaction.options.get("time-in-seconds", true);

          await settingsController.changeUpdatingTime(
            timeCooldown.value as number
          );
          await interaction.followUp({
            content: `Time cooldown updated to ${timeCooldown.value} seconds.`,
            ephemeral: true,
          });
        } else {
          await interaction.followUp({
            content: "There are no settings yet. Run /create-settings first.",
            ephemeral: true,
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  },
};

export default UpdateTimeCooldownCommand;
