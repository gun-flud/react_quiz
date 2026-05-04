import { dataAccessModule } from "../data-access/home.repository.js";
import { pool } from "../../../db/pool.js";

//  export const data = await dataAccessModule.findAll();

export async function getAllQuizzes() {
    const rows = await dataAccessModule.findAll();

    return rows;
}

export async function getById(id) {
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

    console.log(quiz);

    return quiz;
}

export async function createFullQuiz(data) {
    const { questions, ...quizData } = data;
    console.log(data);

    const client = await pool.connect();
    try {
        await client.query("BEGIN");

        const createdQuiz = await dataAccessModule.createQuiz(client, quizData);
        console.log('[CREATED] quiz with id:', createdQuiz.id);

        for (const question of questions) {
            const questionData = {
                quiz_id: createdQuiz.id,
                ...question,
            };

            const createdQuestion = await dataAccessModule.createQuestion(client, questionData);
            console.log('[CREATED] question with id:', createdQuestion.id);

            const optionData = [
                ...question.options
            ];

            const createdOptions = await dataAccessModule.createOption(client, optionData, createdQuestion.id);
            console.log('[CREATED] options:', createdOptions.length);
        }

        await client.query('COMMIT');
        console.log('[CREATED] success!');

    } catch (error) {
        try {
            await client.query("ROLLBACK");
        } catch (rollbackError) {
            console.error('RollbackError: ', rollbackError.message);
        }
        console.error('transaction rolled back:', error.message);
        throw error;
    } finally {
        client.release();
    }
}

export async function deleteById(id) {
    const rows = await dataAccessModule.deleteById(id);
}

export async function editById(id, data) {
    // if 

    const rows = await dataAccessModule.editById(id, data);
}
