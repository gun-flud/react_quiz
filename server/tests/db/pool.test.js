import { pool } from "../../src/db/pool.js";

try {
    const { rows } = await pool.query(`SELECT NOW()`);

    console.log("Db is connected succesfully", rows[0].now);
} catch (err) {
    console.error(`Couldn't reach database: ${err.message}`);
    process.exit(1);
}
