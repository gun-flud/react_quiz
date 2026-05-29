import pino from "pino";
import { env } from "../env.js";

const isDev = env.NODE_ENV !== "production";

export const loggerConfig = isDev
    ? {
          transport: {
              target: "pino-pretty",
              options: {
                  translateTime: "HH:MM:ss Z",
              },
          },
      }
    : {
        //   level: "info",
          timestamp: pino.stdTimeFunctions.isoTime,
      };

export const logger = pino(loggerConfig);