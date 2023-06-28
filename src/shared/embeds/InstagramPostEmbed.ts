import DiscordClient from "src/shared/types/DiscordClient";
import InstagramPostDomain from "../models/domain/InstagramPostDomain";
import { EmbedBuilder } from "discord.js";
import getStringFirstParagraph from "../utils/getStringFirstParagraph";

export default function InstagramPostEmbed(
  post: InstagramPostDomain,
  client: DiscordClient
) {
  const imageUrl =
    post.mediaType === "VIDEO" ? post.thumbnailUrl ?? "" : post.imageUrl;

  return new EmbedBuilder({
    title: getStringFirstParagraph(post.caption ?? "Novo post no Instagram"),
    color: 8600244,
    image: { url: imageUrl },
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
