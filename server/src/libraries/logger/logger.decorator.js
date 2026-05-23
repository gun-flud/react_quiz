import { logger } from "./logger.instance.js";
import { performance } from "node:perf_hooks";

export default function loggerWrapper(logLevel) {
    return (func) => {
        return async (...args) => {
            const started = performance.now();

            if (logLevel !== "ERROR") {
                logger[logLevel.toLowerCase()](
                    {
                        event: "EXECUTION STARTED",
                        name: func.name,
                        args,
                    },
                    `Execution started ${func.name}`,
                );
            }
            try {
                const result = await func(...args);

                const ExecutionTimeMs = Number((performance.now() - started).toFixed(2));

                if (logLevel !== "ERROR") {
                    logger[logLevel.toLowerCase()](
                        {
                            event: "EXECUTION SUCCESS",
                            name: func.name,
                            ExecutionTimeMs,
                            result,
                        },
                        `Execution succed ${func.name}`,
                    );
                }
                return result;
            } catch (error) {
                const ExecutionTimeMs = Number((performance.now() - started).toFixed(2));

                logger.error(
                    {
                        event: "EXECUTION FAILED",
                        name: func.name,
                        ExecutionTimeMs,
                        error: error.message,
                    },
                    `Execution failed ${func.name}`,
                );

                throw error;
            }
        };
    };
}

// wrapper("INFO")(someFn)("testing 123");
// function someFn(args) {
//     // throw new Error('error tester');
//     let ten = 10;
//     return ten;
// }
