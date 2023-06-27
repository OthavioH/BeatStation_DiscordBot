import { GatewayIntentBits, Events, Options } from "discord.js";
import token from "./config/token";
import DiscordClient from "./types/DiscordClient";
import commandList from "./commands/commandList";
import SettingsController from "./controllers/SettingsController";
import ListenerController from "./controllers/ListenerController";
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

try {
  const settingsController = new SettingsController(prisma);

  client.login(token).then(() => {
    console.log("Logged in.");

    const listenerController = new ListenerController(client);
    listenerController.startAllListeners();

    settingsController.createNewSettings();
  });
} catch (error) {
  console.error(error);
}

export default client;
