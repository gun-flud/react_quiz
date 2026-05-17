import * as authController from "./auth.controller.js";

export default function authRoutes (fastify, components, done) {
    fastify.post("/register", authController.register);
    
    // fastify.post("/login", authController.logIn);

    done();
}