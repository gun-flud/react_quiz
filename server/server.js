import Fastify from "fastify";
import cors from "@fastify/cors";
import fastifyCookie from "@fastify/cookie";
import fastifyJWT from "@fastify/jwt";

import { env } from "./src/config/env.js";
import homeRoutes from "./src/apps/home/entry-points/home.routes.js";
import authRoutes from "./src/apps/auth/entry-points/auth.routes.js";
import eventHandler from "./src/libraries/events/events.controller.js";

import query from "./src/db/pool.js";

const PORT = env.PORT;

// logging libriary
const ENV = env.NODE_ENV;
const fastify = Fastify({
    logger: ENV
        ? true
        : {
              transport: {
                  target: "pino-pretty",
                  options: {
                      translateTime: "HH:MM:ss Z",
                  },
              },
          },
});

//CORS usage libriary
fastify.register(cors, {
    origin: "http://localhost:3000",
    methods: ["GET", "PUT", "POST", "DELETE"],
});

fastify.register(fastifyCookie);

fastify.register(fastifyJwt, {
    secret: process.env.JWT_SECRET,
    cookie: {
        cookieName: "token",
        signed: false,
    },
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
