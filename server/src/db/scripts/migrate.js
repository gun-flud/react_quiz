import { readdirSync, readFileSync, existsSync } from "node:fs";
import path from "node:path";
import { fileURLToPath } from "node:url";

import { pool } from "../pool.js";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const migrationsDir = path.join(__dirname, "..", "migrations");

export async function migrationsManager() {
    if (!existsSync(migrationsDir)) {
        console.error("[NOT-FOUND] Migrations directory");
        process.exitCode = 1;
        return;
    }

    let client;
    try {
        client = await pool.connect();
        console.log("[MIGRATE TABLE] Connected to DB");

        await client.query("BEGIN");
        await client.query(`
                CREATE TABLE IF NOT EXISTS _migrations (
                    id SERIAL,
                    filename VARCHAR(255) NOT NULL UNIQUE,
                    run_at TIMESTAMPTZ 
                        DEFAULT NOW(),
                PRIMARY KEY(id)
                )`);
        //create table if !exists
        await client.query("COMMIT");
        console.log("[MIGRATE TABLE] ready");

        const files = readdirSync(migrationsDir)
            .filter((el) => el.endsWith(".sql"))
            .sort();
        console.log("[MIGRATE] found files: ", files);

        for (const file of files) {
            const { rows } = await client.query(
                `SELECT id 
                FROM _migrations 
                WHERE filename = $1`,
                [file],
            );

            if (rows.length > 0) {
                console.log("[MIGRATE] Skipped migration file: ", file);
                continue;
            }

            await client.query("BEGIN");
            // закидуємо міграцію в табличку міграцій
            const dateNow = new Date();
            client.query(
                `
                INSERT INTO _migrations
                (filename, run_at) 
                VALUES ($1, $2)`,
                [file, dateNow],
            );

            const sql = readFileSync(path.join(migrationsDir, file), {
                encoding: "utf-8",
            });

            await client.query(sql);

            await client.query("COMMIT");
            console.log("[MIGRATE] migrated file:", file);
        }
        console.log("[MIGRATE] migration DONE!");
    } catch (error) {
        if (client) {
            try {
                await client.query("ROLLBACK");
                console.error("[ERROR] migration error", error.message);
            } catch (rollbackError) {
                console.error("[ERROR] ROLLBACK error", error.message);
            }
        }
    } finally {
        if (client) {
            await client.release();
            console.log("[DONE]  ended up migration coonection");
        }
    }
}
migrationsManager();
