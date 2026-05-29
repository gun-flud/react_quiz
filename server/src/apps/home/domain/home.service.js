import { dataAccessModule } from "../data-access/home.repository.js";
import { pool } from "../../../db/pool.js";
import { eventBus } from "../../../libraries/events/event.bus.js";

import loggerWrapper from "../../../libraries/logger/logger.decorator.js";
import { logger } from "../../../config/logger/logger.config.js";

async function getAllQuizzes() {
    const rows = await dataAccessModule.findAll();

    return rows;
}

// async function rawGetAllQuizzes() {
//     const rows = await dataAccessModule.findAll();

//     return rows;
// }

// export const getAllQuizzes = loggerWrapper('INFO')(rawGetAllQuizzes);

async function getById(id) {
    const rows = await dataAccessModule.findById(id);

    if (!rows || rows.length === 0) {
        return null;
    }

    const quiz = {
        quiz_id: rows[0].quiz_id,
        title: rows[0].title,
        description: rows[0].description,
        visibility: rows[0].visibility,
        bg_image: rows[0].bg_image,
        questions: [],
    };

    const questions = new Map();

    for (const question of rows) {
        const question_id = question.question_id;

        if (!questions.has(question_id)) {
            questions.set(question.question_id, {
                id: question.question_id,
                body: question.question_body,
                type: question.type,
                points: question.points,
                position: question.question_position,
                options: [],
            });
        }
        if (question.option_id) {
            questions.get(question_id).options.push({
                id: question.option_id,
                body: question.option_body,
                isCorrect: question.is_correct,
                position: question.option_position,
            });
        }
    }

    quiz.questions = [...questions.values()];

    return quiz;
}

async function createFullQuiz(data) {
    const { questions, ...quizData } = data;

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const createdQuiz = await dataAccessModule.createQuiz(client, quizData);
        logger.debug({ quizId: createdQuiz.id }, "[CREATED] quiz with id:");

        for (const question of questions) {
            const questionData = {
                quiz_id: createdQuiz.id,
                ...question,
            };

            const createdQuestion = await dataAccessModule.createQuestion(
                client,
                questionData,
            );
            logger.debug(
                { questionId: createdQuestion.id },
                "[CREATED] question with id:",
            );

            const optionData = [...question.options];

            const createdOptions = await dataAccessModule.createOption(
                client,
                optionData,
                createdQuestion.id,
            );
            logger.debug(
                { optionsLength: createdOptions.length },
                "[CREATED] options:",
            );
        }

        await client.query("COMMIT");
        logger.debug("[CREATED] success!");

        eventBus.publish("SSE", "CREATE_QUIZ", String(createdQuiz.id));
    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            logger.error({ err: rollbackError }, "RollbackError:");
        }
        logger.error({ err: error }, "[ROLLBACK] transaction rolled back:");
        throw error;
    } finally {
        client.release();
    }
}

async function deleteById(id) {
    const rows = await dataAccessModule.deleteById(id);
}

async function editById(id, data) {
    const rows = await dataAccessModule.editById(id, data);
}

export const homeService = {
    editById: loggerWrapper("INFO")(editById),
    deleteById: loggerWrapper("INFO")(deleteById),
    createFullQuiz: loggerWrapper("INFO")(createFullQuiz),
    getById: loggerWrapper("INFO")(getById),
    getAllQuizzes: loggerWrapper("INFO")(getAllQuizzes),
};
