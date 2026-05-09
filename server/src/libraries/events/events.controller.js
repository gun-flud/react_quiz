import { pipeline } from "node:stream/promises";
import { on } from "node:events";
import { Readable } from "node:stream";

import { eventBus, ACTIONS, EVENTS } from "./event.bus.js";

async function* streamGenerator() {
    const events = on(eventBus.getEventEmitter(), EVENTS.SSE);

    for await (const [event_type, data] of events) {
        yield `event: ${event_type}\ndata: ${data}\n\n`;
    }
}

export default function eventHandler(fastify, components, done) {
    fastify.get("/", async (req, reply) => {
        reply.hijack();
        
        reply.raw.setHeader("Content-Type", "text/event-stream");
        reply.raw.setHeader("Cache-Control", "no-cache");
        reply.raw.setHeader("Connection", "keep-alive");

        const ping = setInterval(() => {
            reply.raw.write(':\n\n');
        }, 30000);

        req.raw.on('close', () => {
            clearInterval(ping);
            console.log('Ping stopped, on page close');
        });

        const eventsStream = Readable.from(streamGenerator());

        try {
            await pipeline(eventsStream, reply.raw);
        } catch (err) {
            if (err.code !== 'ERR_STREAM_PREMATURE_CLOSE') {
                console.error("SSE stream error: ", err.message);
            }
        }
    });

    done();
}
