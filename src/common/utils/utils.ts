import { CommandInteraction, GuildMember } from "discord.js";

export default function userHasPermissions(interaction: CommandInteraction) {
  //   const member = interaction.options.getMember("firexter") as GuildMember;

  //   console.log(member.roles);

  return interaction.user.id === "237722255482814464";
}
