import crypto from "node:crypto";
import bcrypt from "bcrypt";

import { DataAccessModule } from "../data-access/auth.repository.js";
import loggerWrapper from "../../../libraries/logger/logger.decorator.js";

async function register(data) {
    const { email, password, username } = data;

    const hashingRounds = 12;

    const encryptedPassword = await bcrypt.hash(password, hashingRounds);

    //email verification data
    const confirmToken = crypto.randomBytes(32).toString("hex");

    const expires = new Date();
    const hoursToExpire = 24;
    expires.setHours(expires.getHours() + hoursToExpire);

    const rows = await DataAccessModule.registerUser(
        email,
        encryptedPassword,
        username,
        confirmToken,
        expires,
    );

    return rows;
}

async function verify(token) {
    const rows = await DataAccessModule.verify(token);

    if (rows.length === 0) {
        const error = new Error("Invalid token");
        error.statusCode = 400;
        throw error;
    }

    return true;
}

async function logIn(data) {
    const { email, password } = data;

    const assertValid = inCase => {
        if (inCase) {
            const error = new Error("Invalid email or password");
            error.statusCode = 401;
            throw error;
        }
    };

    const rows = await DataAccessModule.logIn(email);

    assertValid(rows.length === 0);

    const { id, password_hash } = rows[0];

    const isValid = await bcrypt.compare(password, password_hash);

    assertValid(!isValid);
    
    return { id, message: "Login successful" };
}

export const authService = {
    register: loggerWrapper('INFO')(register),
    verify: loggerWrapper('INFO')(verify),
    logIn: loggerWrapper('INFO')(logIn),
}
