import query from "../../../db/pool.js";

const creator_id = 'f03e7cfd-2a7b-446e-b1b8-cb950fead120';  // mock user id
export class dataAccessModule {
    static async findAll(cursor = null, paginationLimit = 10) {
        paginationLimit = 50; // will delete
        const cursorClause = cursor ? `WHERE created_at < ${cursor}` : "";

        const { rows } = await query(
            `
            SELECT * 
            FROM quizzes
            ${cursorClause}
            ORDER BY created_at DESC
            LIMIT $1
            `,
            [paginationLimit],
        );

        // console.log(rows);

        return rows;
    }

    static async findById(id) {
        const { rows } = await query(
            `
            SELECT quiz.id AS quiz_id,
        quiz.title,
        quiz.description,
        quiz.visibility,
        quiz.bg_image,
        quest.id   AS question_id,
        quest.question  AS question_body,
        quest.type,
        quest.points,
        quest.position  AS question_position,
        opt.id          AS option_id,
        opt.body        AS option_body,
        opt.is_correct,
        opt.position    AS option_position
            FROM quizzes quiz 
            JOIN questions quest 
            ON quest.quiz_id = quiz.id
            JOIN options opt
            ON opt.question_id = quest.id
            WHERE quiz.id = $1
            ORDER BY quest.position, opt.position
            `,
            [id],
        );

        // console.log(rows);

        return rows;
    }

}