import { config } from "dotenv";
config({ path: `.env.${process.env.NODE_ENV || 'development'}`});

import * as z from "zod";

// const envVariables = [
//     'PORT',
// ]

// for (envVar of envVariables) {

//     if(!process.env[envVar]) { 
//         console.error('problem with environment variable: ', envVar);
//         process.exit(1);
//     }
// }

// export default {

// }

const envSchema = z.object({
    PORT: z.coerce.number(),
    DB_HOST: z.coerce.string(),
    DB_PORT: z.coerce.number(),
DB_PORT_INTERNAL: z.coerce.number(),
DB_NAME: z.coerce.string(),
DB_USER: z.coerce.string(),
DB_PASSWORD: z.coerce.string(),

PGADMIN_DEFAULT_EMAIL: z.coerce.string(),
PGADMIN_DEFAULT_PASSWORD: z.coerce.string(),
});
const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("Invalid environment variables:", result.error.format());
    process.exit(1);
} 

export const env = result.data;
