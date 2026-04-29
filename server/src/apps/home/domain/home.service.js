import { dataAccessModule } from "../data-access/home.repository.js";
import { pool } from "../../../db/pool.js";

//  export const data = await dataAccessModule.findAll();

export async function getAllQuizzes() {
    const rows = await dataAccessModule.findAll();

    return rows;
}

export async function getById(id) {
    const rows = await dataAccessModule.findById(id);

    const quiz = {
        quiz_id: rows[0].quiz_id,
        title: rows[0].title,
        description: rows[0].description,
        visibiliti: rows[0].visibiliti,
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
                position: question.position,
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
