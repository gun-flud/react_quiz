import { logger } from "../../config/logger/logger.config.js";
import { performance } from "node:perf_hooks";

export default function loggerWrapper(logLevel="INFO") {
    return (func) => {
        return async (...args) => {
            const started = performance.now();

            if (logLevel !== "ERROR") {
                logger.info(
                    {
                        event: "EXECUTION STARTED",
                        name: func.name,
                    },
                    `Execution started ${func.name}`,
                );

                logger.debug({ args }, `[DEBUG DATA] inputs for ${func.name}`);
            }
            try {
                const result = await func(...args);

                const ExecutionTimeMs = Number((performance.now() - started).toFixed(2));

                if (logLevel !== "ERROR") {
                    logger.info(
                        {
                            event: "EXECUTION SUCCESS",
                            name: func.name,
                            ExecutionTimeMs,
                        },
                        `Execution succed ${func.name}`,
                    );

                    logger.debug({ result }, `[DEBUG DATA] Output for ${func.name}`);
                }
                return result;
            } catch (error) {
                const ExecutionTimeMs = Number((performance.now() - started).toFixed(2));

                logger.error(
                    {
                        event: "EXECUTION FAILED",
                        name: func.name,
                        ExecutionTimeMs,
                        err: error,
                    },
                    `Execution failed ${func.name}`,
                );

                logger.debug({ args }, `[DEBUG DATA] Output for ${func.name}`);

                throw error;
            }
        };
    };
}