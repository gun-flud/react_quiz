export const getUser = {
    schema: {
        headers: {
            type: "object",
                required: ["Authorization"],
                properties: {
                    Authorization: { type: "string" },
                },
        },
        response: {
            200: {
                type: 'object',
                required: ['user'],
                properties: {
                    user: { type: 'object'},
                }
            }
        }
    }
}

//am not sure