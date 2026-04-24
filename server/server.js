import Fastify from "fastify";
import cors from "@fastify/cors"

import { env } from './src/config/env.js'
import homeRoutes from './src/apps/home/entry-points/home.routes.js'

import query from './src/db/pool.js';

const PORT = env.PORT;

// logging libriary
const ENV = env.NODE_ENV;
const fastify = Fastify({
    logger: ENV ? true :
    {
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
    origin: 'http://localhost:3000',
    methods: ['GET', 'PUT', 'POST', 'DELETE'], 
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
                message: { type: 'string' }
            } 
        }
    }
};

fastify.get("/", { schema: getSchema }, (req, res) => {
    return { message: 'hello world' }
    // res.status(200).send("lakhsdklkjajsd");
});

fastify.get("/use", (req, res) => {
    // res.status(200).send("succes");
    return { message: 'hello world' } 
});

// home
fastify.register(homeRoutes, {prefix: '/home'});

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


