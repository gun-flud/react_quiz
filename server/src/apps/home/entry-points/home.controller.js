import * as homeService from "../domain/home.service.js"

export const getHome = async (req, reply) => {
    reply.status(200);
    
    const getAllQuizzes = await homeService.getAllQuizzes();
    return getAllQuizzes;
}

export const getById = async (req, reply) => {
    const { id } = req.params
    reply.status(200);
    return await homeService.getById(id);
}

