import dotenv from "dotenv";

import fastify from "fastify";
import cors from "@fastify/cors";
import fastifyRequestLogger from "@mgcrea/fastify-request-logger";

import client from "./bot";
import routes from "./routes/index.routes";

dotenv.config();

const app = fastify({
  logger: {
    level: "debug",
    transport: {
      target: "@mgcrea/pino-pretty-compact",
      options: { translateTime: "HH:MM:ss", ignore: "pid,hostname" },
    },
  },
  disableRequestLogging: true,
});

app.register(fastifyRequestLogger);

app.register(cors, {
  origin: "*",
});

app.register(routes);

app.listen(
  {
    host: "0.0.0.0",
    port: process.env.PORT ? Number(process.env.PORT) : 8080,
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

export default app;
