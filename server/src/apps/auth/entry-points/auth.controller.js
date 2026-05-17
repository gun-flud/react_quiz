import * as authService from "../domain/auth.service.js";

import inputValidation from "../domain/auth.schema.js";

export const register = async (req, reply) => {
    try {
        //data validation handling
        const data = req.body;
        const validation = inputValidation(data);

        if (!validation.isValid) {
            return reply.status(400).send({ 
                error: "Validation failed", 
                details: validation.errors,
            });
        }
        const validData = validation.data;

        //registering user
        const IsRegisteredHash = await authService.register(validData);

        reply
            .status(201)
            .send(IsRegisteredHash); //email verification

    } catch (error) {
        
        console.error("[REGISTER ERROR]", error);
        reply.status(500).send({ error: "Internal Server Error" });
    }
};

// export const logIn = async (req, reply) => {
//     reply.status(200);

// };
