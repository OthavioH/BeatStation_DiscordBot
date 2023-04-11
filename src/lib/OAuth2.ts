import fetch from "node-fetch";

export default async function getOAuth2(authCode: string) {
  const redirectUri =
    "https://discord.com/api/oauth2/authorize?client_id=1095056679978143856&permissions=2147551232&redirect_uri=http%3A%2F%2Flocalhost%3A3000%2F&response_type=code&scope=bot%20applications.commands";
  const botToken = process.env.DISCORD_BOT_TOKEN;

  const response = await fetch("https://discord.com/api/oauth2/token", {
    method: "POST",
    headers: {
      "Content-Type": "application/x-www-form-urlencoded",
    },
    body: new URLSearchParams({
      client_id: "1095056679978143856",
      client_secret: "X1RrQMsB3KcXNA6Fwn5f-aIaTP7usp8H",
      grant_type: "authorization_code",
      code: authCode,
      redirect_uri: "http://localhost:3000/",
    }),
  });

  const data = await response.json();
  return data;
}
