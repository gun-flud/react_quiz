export const authenticate = async (req, reply) => {
    try {
        await req.jwtVerify();
    } catch (error) {
        if (error
            .code === 'FST_JWT_BAD_REQUEST') {
            return reply.status(400).send({
                error: 'BadFormat',
                message: 'Format is Authorization: Bearer [token]',
                code: 'BAD_REQUEST',
            });
        }

        if (error.code === 'FST_JWT_AUTHORIZATION_TOKEN_EXPIRED') {
            return reply.status(401).send({
                error: "Unauthorized",
                code: "TOKEN_EXPIRED", 
                message: "Access session has expired. Please refresh.",
            });
        }

        return reply.status(401).send({
            error: "Unauthorized",
            code: "TOKEN_INVALID", 
            message: "Access token is missing, invalid, or tampered with."
        });
    }
}