import { z } from "zod";

const InstagramPostZod = () =>
  z.object({
    permalink: z.string(),
    imageUrl: z.string(),
    caption: z.string().optional(),
    mediaType: z.string(),
    thumbnailUrl: z.string().optional(),
  });

export default InstagramPostZod;
