import query from "../../../db/pool.js";
export class DataAccessModule {
    static async registerUser(email, password, username, confirmToken, expires) {
        const { rows } = await query(
            `INSERT INTO users
            (email, password_hash, username, verification_token, token_expires_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING verification_token`,
            [email, password, username, confirmToken, expires],
        );

        return rows;
    }
}
