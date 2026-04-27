import { Pool } from "pg";
import { env } from "../config/env.js";

export const pool = new Pool({
    host: env.DB_HOST,
    port: env.DB_PORT,
    database: env.DB_NAME,
    user: env.DB_USER,
    password: env.DB_PASSWORD,

    max: 20,
    idleTimeoutMillis: 30000,
    connectionTimeoutMillis: 2000,
});

pool.on("error", (err) => {
    console.error("Unexpected DB pool error:", err.message);
    process.exit(1);
});

export default async function query(sql, params = "") {
    try {
        const reply = await pool.query(sql, params);
        return reply;
    } catch (err) {
        console.error("DB query failed:", err.message);
        throw err;
    }
}
