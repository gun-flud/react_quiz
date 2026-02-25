const express = require('express');
const sqlite3 = require('sqlite3').verbose();
const cors = require('cors');

const app = express();
const PORT = 3000;

app.use(cors()); // запити з React
app.use(express.json()); //читати JSON з тіла запиту (для POST/PUT)

// Підключення до БД
const db = new sqlite3.Database('./quiz.db', (err) => {
    if (err) console.error(err.message);
    console.log('Connected to the SQLite database.');
});

// --- ROUTES (API) ---

// 1. GET: Отримати всі тести (Складний запит для збирання JSON)
app.get('/quizzes', (req, res) => {
    const sql = `
        SELECT 
            q.id as quiz_id, q.title, q.description,
            qs.id as question_id, qs.text as question_text,
            o.id as option_id, o.text as option_text, o.is_correct
        FROM quizzes q
        LEFT JOIN questions qs ON q.id = qs.quiz_id
        LEFT JOIN options o ON qs.id = o.question_id
        ORDER BY q.id DESC, qs.id ASC, o.id ASC
    `;

    db.all(sql, [], (err, rows) => {
        if (err) return res.status(500).json({ error: err.message });

        // Перетворюємо плоскі рядки SQL у вкладений об'єкт (структуру, яку чекає React)
        const quizzesMap = new Map();

        rows.forEach(row => {
            if (!quizzesMap.has(row.quiz_id)) {
                quizzesMap.set(row.quiz_id, {
                    id: row.quiz_id,
                    title: row.title,
                    description: row.description,
                    questions: [] // Масив питань
                });
            }

            const quiz = quizzesMap.get(row.quiz_id);

            // Якщо є питання (бо може бути тест без питань)
            if (row.question_id) {
                let question = quiz.questions.find(q => q.id === row.question_id);
                
                if (!question) {
                    question = {
                        id: row.question_id,
                        text: row.question_text,
                        options: [] // Масив опцій
                    };
                    quiz.questions.push(question);
                }

                // Якщо є опція
                if (row.option_id) {
                    question.options.push({
                        id: row.option_id,
                        text: row.option_text,
                        isCorrect: !!row.is_correct // 1 -> true, 0 -> false
                    });
                }
            }
        });

        // Перетворюємо Map назад у масив
        const result = Array.from(quizzesMap.values());
        res.json(result);
    });
});

// 2. DELETE: Видалити тест
app.delete('/quizzes/:id', (req, res) => {
    const id = req.params.id;
    // ON DELETE CASCADE у базі видалить також питання і опції автоматично
    db.run("DELETE FROM quizzes WHERE id = ?", id, function(err) {
        if (err) return res.status(500).json({ error: err.message });
        res.json({ message: "Deleted", changes: this.changes });
    });
});

// 3. POST:
app.post('/quizzes', (req, res) => {
    const { title, description, questions } = req.body;

    // щоб запити виконувались по черзі
    db.serialize(() => {
        // Вставляємо ТЕСТ
        db.run("INSERT INTO quizzes (title, description) VALUES (?, ?)", [title, description], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            const newQuizId = this.lastID; // Отримуємо ID 

            if (!questions || questions.length === 0) {
                 return res.status(201).json({ id: newQuizId, title, description, questions: [] });
            }

                const stmtQuestion = db.prepare("INSERT INTO questions (quiz_id, text) VALUES (?, ?)");
                const stmtOption = db.prepare("INSERT INTO options (question_id, text, is_correct) VALUES (?, ?, ?)");

                let quizCount = 0;

                questions.forEach(q => {
                    stmtQuestion.run(newQuizId, q.text, function(err) {
                        if (err) console.error(err);

                        const questionId = this.lastID;

                        // Вставляємо опції для цього питання
                        if (q.options && q.options.length > 0) {
                            q.options.forEach(opt => {
                
                                stmtOption.run(questionId, opt.text, opt.isCorrect ? 1 : 0);
                            });
                        }

                        quizCount++;

                        if (quizCount === questions.length) {   
                            stmtQuestion.finalize();
                            stmtOption.finalize();
                            // Повертаємо фронтенду об'єкт з новим ID
                            res.status(201).json({ id: newQuizId, title, description, questions });
                        }
                    });    
                });
        });
    });
});

// 4. PUT: Оновити існуючий тест
app.put('/quizzes/:id', (req, res) => {
    const quizId = req.params.id;
    const { title, description, questions } = req.body;

    db.serialize(() => {
        // Оновлюємо заголовок і опис
        db.run("UPDATE quizzes SET title = ?, description = ? WHERE id = ?", [title, description, quizId], function(err) {
            if (err) return res.status(500).json({ error: err.message });
            
            // Видаляємо всі старі питання цього тесту (опції видаляться автоматом через CASCADE)
            db.run("DELETE FROM questions WHERE quiz_id = ?", quizId, function(err) {
                if (err) console.error("Error clearing old questions:", err);

                // Записуємо "нові" питання (ті самі, що прийшли з фронтенду)
                if (!questions || questions.length === 0) {
                    return res.json({ id: parseInt(quizId), title, description, questions: [] });
                }

                new Promise((resolve, reject) => { 
                    const stmtQuestion = db.prepare("INSERT INTO questions (quiz_id, text) VALUES (?, ?)");
                    const stmtOption = db.prepare("INSERT INTO options (question_id, text, is_correct) VALUES (?, ?, ?)");

                    let quizCount = 0;
                    questions.forEach(q => {
                        stmtQuestion.run(quizId, q.text, function(err) {
                            if (err) return reject(err);


                            const questionId = this.lastID;
                            
                            if (q.options) {
                                q.options.forEach(opt => {
                                    stmtOption.run(questionId, opt.text, opt.isCorrect ? 1 : 0);
                                });
                            }
                            quizCount++;
                            if (quizCount === questions.length) {
                                resolve({ stmtQuestion, stmtOption });
                            }
                        });
                    });
                    
                }).then((statements) => {
                    statements.stmtQuestion.finalize();
                    statements.stmtOption.finalize();
                    res.json({ id: parseInt(quizId), title, description, questions });
                }).catch(err => {
                    console.error("Error inserting questions/options:", err)
                    res.status(500).json({ error: err.message });
                });
            });
        });
    });
});

// Запуск сервера
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});