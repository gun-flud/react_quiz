import crypto from "node:crypto";
import bcrypt from "bcrypt";

import { DataAccessModule } from "../data-access/auth.repository.js";

export async function register(data) {
    const { email, password, username } = data;
    const hashingRounds = 12;

    const encriptedPassword = await bcrypt.hash(password, hashingRounds);

    //email verification data
    const confirmToken = crypto.randomBytes(32).toString('hex');

    const expires = new Date();
    const hoursToExpire = 24 
    expires.setHours(expires.getHours() + hoursToExpire);



    const rows = await DataAccessModule.registerUser(
        email,
        encriptedPassword,
        username,
        confirmToken,
        expires
    );

    return rows;
}
