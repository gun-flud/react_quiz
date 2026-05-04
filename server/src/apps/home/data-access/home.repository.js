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

    static async createQuiz(client, data) {

        // const { title, description, visibility, bg_image, points, created_at } =
        //     data;
        const { title, description, visibility, bg_image, points} =
            data;

        const { rows } = await client.query(
            `
            INSERT INTO quizzes
            (title, description, visibility, bg_image, points, creator_id)
            VALUES ($1, $2, $3, $4, $5, $6)
            RETURNING *
            `,
            // [title, description, visibility ?? 'private', bg_image, points, created_at, creator_id],
            [title, description, visibility ?? 'private', bg_image, points, creator_id],
        );

        return rows[0];
    }

    static async createQuestion(client, data) {
        const { quiz_id, question, type, points, position } = data;

        const { rows } = await client.query(
            `
            INSERT INTO questions
            (quiz_id, question, type, points, position )
            VALUES ($1, $2, $3, $4, $5)
            RETURNING id
            `,
            [quiz_id, question, type, points, position],
        );

        return rows[0];
    }

    static async createOption(client, options, question_id) {
        const values = [];
        
        const placeholders = options.map((option, i) => {
            const baseCount = i * 4;
            values.push(question_id, option.text, option.isCorrect, option.position);
            return `($${baseCount + 1}, $${baseCount + 2}, $${baseCount + 3}, $${baseCount + 4})`;
        })

        const { rows } = await client.query(
            `
            INSERT INTO options
            (question_id, body, is_correct, position)
            VALUES ${placeholders.join(',')}
            RETURNING id
            `,
            values,
        );

        return rows;
    }

    static async editById(id, data) {

    }

    static async deleteById(id) {
        const { rows } = await query(`
            DELETE FROM quizzes
            WHERE id = $1
            `, [id]);
        return rows;
    }
}