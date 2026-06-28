export const logInSchema = {
    schema: {
        body: {
            type: "object",
            required: ["email", "password"],
            properties: {
                email: {
                    type: "string",
                    format: "email",
                },
                password: {
                    type: "string",
                    minLength: 8,
                },
            },
            additionalProperties: false,
        },
        response: {
            200: {
                type: "object",
                required: ["message", "accessToken"],
                properties: {
                    message: { type: "string" },
                    accessToken: { type: "string" },
                },
                additionalProperties: false,
            },
        },
    },
};
