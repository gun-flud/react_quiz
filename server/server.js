import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";
import jwt from "jsonwebtoken";

import { env } from "./src/config/env.js";
import homeRoutes from "./src/apps/home/entry-points/home.routes.js";
import authRoutes from "./src/apps/auth/entry-points/auth.routes.js";
import eventHandler from "./src/libraries/events/events.controller.js";
import { loggerConfig } from "./src/config/logger/logger.config.js";
import query from "./src/db/pool.js";

const PORT = env.PORT;

// logging libriary
const fastify = Fastify({
    logger: loggerConfig,
});

//CORS usage libriary
fastify.register(cors, {
    origin: "http://localhost:3000",
    credentials: true,
    methods: ["GET", "PUT", "POST", "DELETE"],
});

fastify.register(fastifyCookie);

fastify.register(fastifyJWT, {
    secret: env.JWT_ACCESS_TOKEN_SECRET,
});

//listening for server
const port = {
    port: PORT,
    host: "0.0.0.0",
};

// return schema
const getSchema = {
    response: {
        200: {
            properties: {
                message: { type: "string" },
            },
        },
    },
};

//streams practice
fastify.register(eventHandler, { prefix: "/stream" });

// home
fastify.register(homeRoutes, { prefix: "/home" });

// auth
fastify.register(authRoutes, { prefix: "/auth" });

try {
    await fastify.listen(port);
} catch (err) {
    fastify.log.fatal(err);
    process.exit(1);
}
// fastify.listen(port, (err, address) => {
//     if (err) {
//         fastify.log.fatal(err);
//         process.exit(1);
//     }
// });
