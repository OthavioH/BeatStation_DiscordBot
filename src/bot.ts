import { GatewayIntentBits, Events, Options } from "discord.js";
import token from "./config/token";
import DiscordClient from "./shared/types/DiscordClient";
import commandList from "./commands/commandList";
import SettingsController from "./controllers/SettingsController";
import { prisma } from "./config/db/prisma";
import ready from "./shared/listeners/ready/ready";
import interactionHandler from "./shared/listeners/interactionHandler/interactionHandlerListener";

const client = new DiscordClient({
  intents: [GatewayIntentBits.Guilds, GatewayIntentBits.GuildVoiceStates],
  sweepers: {
    ...Options.DefaultSweeperSettings,
    voiceStates: {
      interval: 2,
      filter: () => null,
    },
  },
});

commandList.forEach((command) => {
  client.commands.set(command.data.name, command);
});

client.once(Events.ClientReady, ready);

client.on(Events.InteractionCreate, interactionHandler);
client.on(Events.GuildMemberUpdate, (oldMember, newMember) => {
  if (client.user!.id === newMember.id) {
    // verify roles, if has 0 roles, then the bot was kicked
    if (newMember.roles.cache.entries.length === 0) {
      console.log("bot was kicked");
      settingsController.deleteSettings(newMember.guild.id);
    }
  }
});

export const settingsController = new SettingsController(prisma);

client.login(token);

export default client;
