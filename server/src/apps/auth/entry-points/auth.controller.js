import * as authService from "../domain/auth.service.js";

import jwt from "jsonwebtoken";

import { validateLogIn, validateRegister } from "../domain/auth.schema.js";

export const register = async (req, reply) => {
    try {
        //data validation handling
        const data = req.body;
        const validation = validateRegister(data);

        if (!validation.isValid) {
            return reply.status(400).send({
                error: "Validation failed",
                details: validation.errors,
            });
        }
        const validData = validation.data;

        //registering user
        const IsRegisteredHash = await authService.register(validData);

        return reply.status(201).send(IsRegisteredHash); //email verification
    } catch (error) {
        if (error.code === "23505") {
            return reply
                .status(409)
                .send({ message: "user with this email already exists" });
        }

        console.error("[REGISTER ERROR]", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
};

export const verify = async (req, reply) => {
    const { token } = req.query;

    try {
        await authService.verify(token);
        return reply
            .status(201)
            .send({ message: "User verified successfully" });
    } catch (error) {
        if (error.statusCode === 400) {
            return reply.status(400).send({ error: error.message });
        }

        console.error("[VERIFY ERROR]", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
};

export const getUser = async (req, reply) => {
    try {
        await req.jwtVerify();

        return reply.status(200).send({ user: req.user });
    } catch (error) {
        return reply.status(401).send({ error: "Unauthorized" });
    }
};

export const logIn = async (req, reply) => {
    const data = req.body;
    const validation = validateLogIn(data);

    if (!validation.isValid) {
        return reply.status(400).send({
            error: "Validation failed",
            details: validation.errors,
        });
    }
    const validData = validation.data;

    try {
        const { id, message } = await authService.logIn(validData);

        const accessToken = await reply.jwtSign(
            {
                userId: id,
                role: "student", //will be changed to not be mock
            },
            { expiresIn: "15m" },
        );

        const refreshToken = jwt.sign(
            {
                userId: id,
                type: "refresh",
            },
            env.JWT_REFRESH_TOKEN_SECRET,
            { expiresIn: "10d" },
        );

        reply.setCookie("refreshToken", refreshToken, {
            domain: "localhost",
            path: "/",
            // secure: true, // HTTPS only
            httpOnly: true,
            sameSite: "strict",
            maxAge: 10 * 24 * 60 * 60,
        });

        return reply
            .status(200)
            .send({ message: "Login successful", accessToken: accessToken });
    } catch (error) {
        if (error.statusCode === 401) {
            return reply
                .status(error.statusCode)
                .send({ error: error.message });
        }

        console.error("[LOGIN ERROR]", error);
        return reply.status(500).send({ error: "Internal Server Error" });
    }
};

export const refresh = async (req, reply) => {
    try {
        const refreshToken = req.cookies.refreshToken;
        if (!refreshToken) {
            return reply.status(401).send({ error: "No refresh token found" });
        }

            const decodedToken = jwt.verify(
                refreshToken,
                env.JWT_REFRESH_TOKEN_SECRET,
            );

            const accessToken = await reply.jwtSign(
                {
                    userId: decodedToken.userId,
                    role: "student",
                },
                { expiresIn: "15m" },
            );

            return reply
                .status(200)
                .send({
                    message: "Login successful",
                    accessToken: accessToken,
                });
    } catch (error) {
        return reply
            .status(403)
            .send({ error: "Invalid refresh token, try to login" });
    }
};

export const logOut = async (req, reply) => {
    reply.clearCookie("refreshToken", { path: "/" });

    return reply.status(200).send({ message: "Logged out successfully" });
};
