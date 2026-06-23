import pino from "pino";
import { env } from "../env.js";

const isDev = env.NODE_ENV !== "production";
const logLevel = env.LOGGER_MODE;

export const loggerConfig = isDev
    ? {
          level: logLevel.toLowerCase(),
          transport: {
              target: "pino-pretty",
              options: {
                  translateTime: "HH:MM:ss Z",
              },
          },
      }
    : {
          level: logLevel.toLowerCase(),
          timestamp: pino.stdTimeFunctions.isoTime,
      };

export const logger = pino(loggerConfig);
