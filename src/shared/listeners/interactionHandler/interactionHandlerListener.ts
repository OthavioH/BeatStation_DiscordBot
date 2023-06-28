import { BaseInteraction } from "discord.js";
import client from "src/bot";

export default async function interactionHandler(interaction: BaseInteraction) {
  if (!interaction.isChatInputCommand()) return;

  const command = client.commands.get(interaction.commandName);

  if (!command) {
    console.log(
      `[WARNING] The command ${interaction.commandName} was not found.`
    );
  }

  try {
    await command?.execute(interaction);
  } catch (error) {
    console.error(error);
    if (interaction.replied || interaction.deferred) {
      await interaction.followUp({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    } else {
      await interaction.reply({
        content: "There was an error while executing this command!",
        ephemeral: true,
      });
    }
  }
}
