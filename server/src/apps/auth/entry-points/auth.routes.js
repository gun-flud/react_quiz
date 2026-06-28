import * as authController from "./auth.controller.js";
import { registerSchema } from "../schemas/register.schema.js";
import { logInSchema } from "../schemas/login.schema.js";
import { getUser } from "../schemas/getUser.schema.js";
import { refresh } from "../schemas/refresh.schema.js";

export default function authRoutes (fastify, components, done) {
    //fastify.post("/register", registerSchema, authController.register); //registration

    fastify.get("/verify", authController.verify); //email verification during registration
    
    fastify.post("/login", logInSchema, authController.logIn);

    fastify.get("/user", getUser, authController.getUser);

    fastify.post("/logout", authController.logOut);

    fastify.post("/refresh",refresh ,authController.refresh);

    done();
}