import { EmbedBuilder, MessageCreateOptions, MessagePayload } from "discord.js";
import InstagramPostEmbed from "../embeds/InstagramPostEmbed";
import InstagramPostDomain from "../models/domain/InstagramPostDomain";
import DiscordClient from "src/shared/types/DiscordClient";

export default function InstagramPostMessage(
  instagramPostInfo: InstagramPostDomain,
  client: DiscordClient,
  roleId: string | null
): MessageCreateOptions {
  const embed: EmbedBuilder = InstagramPostEmbed(instagramPostInfo, client);
  return {
    content: `<:60_Instagram:1103736678109167687> **Post novo no Instagram do BeatStation!!**\n\n${
      roleId ? `<@&${roleId}>` : ""
    }`,
    embeds: [embed],
  };
}
