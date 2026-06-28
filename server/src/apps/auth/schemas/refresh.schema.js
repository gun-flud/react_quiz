export const refresh = {
    schema: {
        response: {
            200: {
                type: 'object',
                required: ["message", "accessToken"],
                properties: {
                    message: { type: 'string' },
                    accessToken: { type: 'string'},
                },
                additionalProperties: false,
            }
        }
    }
}