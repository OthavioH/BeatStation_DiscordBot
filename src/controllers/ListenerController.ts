import { Client } from "discord.js";
import ready from "../listeners/ready/ready";
import interactionCreateListener from "../listeners/interactionCreate/interactionCreateListener";

export default class ListenerController {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public startAllListeners() {
    interactionCreateListener(this.client);
    ready(this.client);
  }
}
