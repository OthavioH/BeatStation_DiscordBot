import {
  ApplicationCommandPermissionType,
  BaseInteraction,
  Client,
  CommandInteraction,
} from "discord.js";
import { Commands } from "../../Commands";
import SettingsController from "../../controllers/SettingsController";

export default function interactionCreateListener(client: Client) {
  client.on("interactionCreate", (interaction) => {
    if (interaction.isCommand() || interaction.isContextMenuCommand()) {
      handleCommand(client, interaction);
    }
  });
}

const handleCommand = async (
  client: Client,
  interaction: CommandInteraction
): Promise<void> => {
  const slashCommand = Commands.find((c) => c.name == interaction.commandName);
  if (!slashCommand) {
    interaction.followUp({ content: "Command not found" });
    return;
  }

  await interaction.deferReply();
  // await interaction.guild?.commands.permissions.set({
  //   permissions: [
  //     {
  //       id: "816415908108304455",
  //       type: ApplicationCommandPermissionType.Role,
  //       permission: true,
  //     },
  //     {
  //       id: "237722255482814464",
  //       type: ApplicationCommandPermissionType.User,
  //       permission: true,
  //     },
  //   ],
  //   command: interaction.commandId,
  //   token: await SettingsController.getToken(),
  // });

  slashCommand.run(client, interaction);
};
