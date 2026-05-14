import query from "../../../db/pool";

export class DataAccessModule {
    static async registerUser (email, password, username) {
        const { rows } = await query(
            ``,
            [email, password, username]
        )

        return rows;
    } 
}