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

export const create = async (req, reply) => {
    const data = req.body;
    
    reply.status(201)
    return await homeService.createFullQuiz(data);  
}

export const deleteById = async (req, reply) => {
    const { id } = req.params;
    await homeService.deleteById(id);
    reply.status(200).send({message: 'deleted successfuly'});
}

export const editById = async (req, reply) => {
    const { id } = req.params;
    await homeService.editById(id, data);
     reply.status(201).send({message: 'edited successfuly'});
}