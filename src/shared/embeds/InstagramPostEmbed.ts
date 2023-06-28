import DiscordClient from "src/shared/types/DiscordClient";
import InstagramPostDomain from "../models/domain/InstagramPostDomain";
import { EmbedBuilder } from "discord.js";

export default function InstagramPostEmbed(
  post: InstagramPostDomain,
  client: DiscordClient
) {
  return new EmbedBuilder({
    title: post.caption ?? "Novo post no Instagram",
    color: 8600244,
    video: post.mediaType === "VIDEO" ? { url: post.imageUrl } : undefined,
    image: post.mediaType === "IMAGE" ? { url: post.imageUrl } : undefined,
    thumbnail: post.thumbnailUrl ? { url: post.thumbnailUrl } : undefined,
    url: post.permalink,
    author: {
      name: "BeatStation",
      url: "https://www.instagram.com/beatstation777/",
      icon_url: client.user?.displayAvatarURL(),
    },
    footer: {
      text: "Instagram",
    },
  });
}
