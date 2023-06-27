import { Client, ClientOptions, Collection } from "discord.js";
import Command from "src/common/models/Command";

export default class DiscordClient extends Client {
  commands: Collection<string, Command> = new Collection();

  constructor(options: ClientOptions) {
    super(options);
  }
}
