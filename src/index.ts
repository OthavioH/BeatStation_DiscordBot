import dotenv from "dotenv";

import fastify from "fastify";
import cors from "@fastify/cors";
import client, { settingsController } from "./bot";
import routes from "./routes/index.routes";

dotenv.config();

const app = fastify({ logger: true });

app.register(cors, {
  origin: "*",
});

app.register(routes);

app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 3333,
  },
  (err, address) => {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    client.isReady();

    console.log("Bot started.");
  }
);
