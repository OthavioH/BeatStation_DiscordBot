import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import app from "src";
import { settingsController } from "src/bot";

export default {
  data: new SlashCommandBuilder()
    .setName("disable-instagram-notifier")
    .setDescription("Desativar a notificação de novos posts do Instagram"),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      await settingsController.deleteSettings(interaction.guildId as string);

      await interaction.reply({
        content: `Notificação de novos posts do Instagram desativada!`,
        ephemeral: true,
      });
    } catch (error) {
      app.log.error(error);
    }
  },
};
