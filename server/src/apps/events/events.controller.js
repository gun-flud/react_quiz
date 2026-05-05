import { pipeline } from "node:stream/promises";
import { EventEmitter, on } from "node:events";
import { Readable } from "node:stream";

export const emmitHandler = new EventEmitter();
emmitHandler.setMaxListeners(0);

async function* streamGenetrator() {
    const events = on(emmitHandler, "SSE");

    for await (const [event_type, data] of events) {
        yield `event: ${event_type}\ndata: ${data}\n\n`;
    }
}

export default function evetHandler(fastify, components, done) {
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

        const eventsStream = Readable.from(streamGenetrator());

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
//  emmitHandler.emit("SSE", "CREATE_QUIZ", "10");
// emmitHandler.emit("SSE", "EDIT_QUIZ", "10");
// emmitHandler.emit("SSE", "DELETE_QUIZ", "10");
