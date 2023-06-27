import {
  ChatInputCommandInteraction,
  SlashCommandBuilder,
  SlashCommandChannelOption,
} from "discord.js";
import SettingsController from "src/controllers/SettingsController";

const channelOption = (option: SlashCommandChannelOption) =>
  option.setName("channel").setDescription("Channel to post").setRequired(true);

export default {
  data: new SlashCommandBuilder()
    .setName("set-channel")
    .setDescription("Set Channel to post")
    .addChannelOption(channelOption),
  async execute(interaction: ChatInputCommandInteraction) {
    try {
      SettingsController.setChannel(
        interaction.options.getChannel("channel")!.id
      );
      const channel = interaction.options.getChannel("channel");

      if (interaction && !interaction.replied) {
        await interaction.reply({
          content: `${channel} set as channel to post}`,
          ephemeral: true,
        });
      }
    } catch (error) {
      console.error(error);
    }
  },
};
