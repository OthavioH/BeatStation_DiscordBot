import { GatewayIntentBits, Events, Options } from "discord.js";
import token from "./config/token";
import DiscordClient from "./types/DiscordClient";
import commandList from "./commands/commandList";
import SettingsController from "./controllers/SettingsController";
import { prisma } from "./db/prisma";
import ready from "./listeners/ready/ready";
import interactionHandler from "./listeners/interactionHandler/interactionHandlerListener";

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

export const settingsController = new SettingsController(prisma);

client.login(token);

export default client;
