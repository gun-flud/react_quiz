import { homeService } from "../domain/home.service.js";

export const getHome = async (req, reply) => {
    reply.status(200);

    const getAllQuizzes = await homeService.getAllQuizzes();
    return getAllQuizzes;
};

export const getById = async (req, reply) => {
    const { id } = req.params;
    reply.status(200);
    return await homeService.getById(id);
};

export const create = async (req, reply) => {
    const data = req.body;

    await homeService.createFullQuiz(data);
    reply.status(201).send({ message: "created successfully" });
};

export const deleteById = async (req, reply) => {
    const { id } = req.params;
    await homeService.deleteById(id);
    reply.status(200).send({ message: "deleted successfully" });
};

export const editById = async (req, reply) => {
    const { id } = req.params;
    const data = req.body;
    await homeService.editById(id, data);
    reply.status(201).send({ message: "edited successfully" });
};
