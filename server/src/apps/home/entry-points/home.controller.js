import * as homeService from "../domain/home.service.js"

export const getHome = async (req, reply) => {
    reply.status(200);
    return await homeService.data;
}