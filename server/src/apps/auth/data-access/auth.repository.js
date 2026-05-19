import query from "../../../db/pool.js";
export class DataAccessModule {
    static async registerUser(
        email,
        password,
        username,
        confirmToken,
        expires,
    ) {
        const { rows } = await query(
            `INSERT INTO users
            (email, password_hash, username, verification_token, token_expires_at)
            VALUES ($1, $2, $3, $4, $5)
            RETURNING verification_token`,
            [email, password, username, confirmToken, expires],
        );

        return rows;
    }

    static async verify(token) {
        const { rows } = await query(
            `UPDATE users
            SET is_verified = TRUE,
                verification_token = NULL,
                token_expires_at = NULL
            WHERE verification_token = $1
                AND token_expires_at > NOW()
            RETURNING id`,
            [token],
        );

        return rows;
    }

    static async logIn (email) {
        const { rows } = await query(
            `SELECT id, password_hash FROM users
            WHERE email = $1 AND is_verified = TRUE;
            `, 
            [email]
        );

        return rows;
    }
}
