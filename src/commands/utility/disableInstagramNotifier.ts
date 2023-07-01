import { SlashCommandBuilder, ChatInputCommandInteraction } from "discord.js";
import app from "src";
import { settingsController } from "src/bot";

export default {
  data: new SlashCommandBuilder()
    .setName("disable-instagram-notifier")
    .setDescription("Desativar a notificação de novos posts do Instagram"),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      const deletedSettings = await settingsController.deleteSettings(
        interaction.guildId as string
      );

      if (deletedSettings) {
        await interaction.reply({
          content: `Notificação de novos posts do Instagram desativada!`,
          ephemeral: true,
        });
      } else {
        await interaction.reply({
          content: `Não há notificação de novos posts do Instagram para desativar!`,
          ephemeral: true,
        });
      }
    } catch (error) {
      app.log.error(error);
    }
  },
};
