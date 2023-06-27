import { Client, REST, Routes } from "discord.js";
import commandList from "src/commands/commandList";
import token from "src/config/token";

export default async function ready(c: Client) {
  console.log(`Ready! Logged in as ${c.user?.tag}`);
  // const commands = commandList.map((command) => command.data.toJSON());

  // console.log(
  //   `Started refreshing ${commands.length} application (/) commands.`
  // );

  // const rest = new REST().setToken(token);

  // const data: any = await rest.put(
  //   Routes.applicationCommands(process.env.CLIENT_ID as string),
  //   {
  //     body: commands,
  //   }
  // );

  // console.log(
  //   `Successfully reloaded ${data.length ?? 0} application (/) commands.`
  // );
}
