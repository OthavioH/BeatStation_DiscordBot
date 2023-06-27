import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

export default {
  data: new SlashCommandBuilder().setName("ping").setDescription("Descubra"),
  async execute(interaction: ChatInputCommandInteraction) {
    await interaction.reply({
      content: "Pong!",
      ephemeral: true,
    });
  },
};
