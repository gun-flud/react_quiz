export const getUser = {
    schema: {
        body: {
            type: "object",
                required: ["accessToken"],
                properties: {
                    accessToken: { type: "string" },
                },
                additionalProperties: false,
        },
        response: {
            200: {
                type: 'object',
                required: ['user'],
                properties: {
                    user: { type: 'string'},
                }
            }
        }
    }
}

//am not sure