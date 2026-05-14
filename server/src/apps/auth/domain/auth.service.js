import bcrypt from "bcrypt";

import { DataAccessModule } from "../data-access/auth.repository.js";

export async function register(data) {
    const { email, password, username } = data;
    const hashingRounds = 12;

    const encriptedPassword = await bcrypt.hash(password, hashingRounds);

    const rows = await DataAccessModule.registerUser(
        email,
        encriptedPassword,
        username,
    );

    return rows;
}
