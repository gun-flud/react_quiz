import * as authService from "../domain/auth.service.js";

export const register = async (req, reply) => {
    try {
        const data = req.body;
        // const typeSefaData = zodSchema(data);
        const IsRegisteredHash = await authService.register(data);
        
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
