import Fastify from "fastify";

// logging
const fastify = Fastify({
    logger: {
        transport: {
            target: "pino-pretty",
            options: {
                translateTime: "HH:MM:ss Z",
            },
        },
    },
});

fastify.get("/", (req, res) => {
    res.status(200).send("lakhsdklkjajsd");
});

fastify.get("/use", (req, res) => {
    res.status(200).send("succes");
});

//listening for server
const port = {
    port: 8080,
    host: "0.0.0.0",
};
fastify.listen(port, (err, address) => {
    if (err) {
        fastify.log.fatal(err);
        process.exit(1);
    }
});
