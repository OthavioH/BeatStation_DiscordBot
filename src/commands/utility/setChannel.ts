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
    SettingsController.setChannel(
      interaction.options.getChannel("channel")!.id
    );

    await interaction.reply({
      content: `${interaction.options.getChannel(
        "channel"
      )} set as channel to post}`,
      ephemeral: true,
    });
  },
};
