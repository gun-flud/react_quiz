import pino from "pino";
import { loggerConfig } from "../../config/logger/logger.config.js";

// Native Pino reads the raw options directly
export const logger = pino(loggerConfig);

// import { loggerConfig } from "../../config/logger/logger.config";

// export const fastify = Fastify({
//     logger: loggerConfig
// });
