import * as authController from "./auth.controller.js";

export default function authRoutes (fastify, components, done) {
    fastify.post("/register", authController.register);

    fastify.get("/verify", authController.verify);
    
    fastify.post("/login", authController.logIn);

    fastify.get("/user", authController.getUser);

    fastify.post("/logout", authController.logOut);

    fastify.post("/refresh", authController.refresh);

    done();
}