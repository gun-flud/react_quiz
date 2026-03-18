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
    PORT: z.coerce.number()
});
const result = envSchema.safeParse(process.env);

if (!result.success) {
    console.error("Invalid environment variables:", result.error.format());
    process.exit(1);
} 

export const env = result.data;
