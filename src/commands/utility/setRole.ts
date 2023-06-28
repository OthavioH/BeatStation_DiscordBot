import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandRoleOption,
} from "discord.js";
import { settingsController } from "src/bot";

const roleOption = (option: SlashCommandRoleOption) =>
  option.setName("role").setDescription("Role to tag").setRequired(true);

export default {
  data: new SlashCommandBuilder()
    .setName("set-role")
    .setDescription("Set Role to tag")
    .addRoleOption(roleOption),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      settingsController.createNewSettings(
        interaction.guildId as string,
        interaction.options.getRole("role")!.id
      );
      const role = interaction.options.getRole("role");

      if (interaction.isRepliable() && !interaction.replied) {
        await interaction.reply({
          content: `${role} set as the role to tag`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
