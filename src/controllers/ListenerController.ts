import { Client } from "discord.js";
import ready from "../listeners/ready/ready";

export default class ListenerController {
  private client: Client;

  constructor(client: Client) {
    this.client = client;
  }

  public startAllListeners() {
    ready(this.client);
  }
}
