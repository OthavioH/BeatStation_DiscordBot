import { REST, Routes } from "discord.js";
import commandList from "src/commands/commandList";
import token from "src/config/token";
import dotenv from "dotenv";

const rest = new REST().setToken(token);

dotenv.config();

(async () => {
  try {
    const commands = commandList.map((command) => command.data.toJSON());

    console.log(
      `Started refreshing ${commands.length} application (/) commands.`
    );

    const data: any = await rest.put(
      Routes.applicationCommands(process.env.CLIENT_ID as string),
      {
        body: commands,
      }
    );

    console.log(
      `Successfully reloaded ${data.length ?? 0} application (/) commands.`
    );
  } catch (error) {
    console.error(error);
  }
})();
