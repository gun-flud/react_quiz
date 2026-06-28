export const registerSchema = {
    schema: {
        body: {
            type: "object",
            required: ["email", "password", "username"], //+ role mb
            properties: {
                email: {
                    type: "string",
                    format: "email",
                },
                password: {
                    type: "string",
                    minLength: 8,
                },
                username: {
                    type: "string",
                    minLength: 4,
                },
                // role: {
                //     type: 'string',
                // }
            },
            additionalProperties: false,
        },
        response: {
            201: {
                type: "object",
                required: ["verification_token"],
                properties: {
                    verification_token: { type: "string" },
                },
                additionalProperties: false,
            },
        },
    },
};
