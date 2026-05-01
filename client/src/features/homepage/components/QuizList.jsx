import { useState, useEffect } from "react";

import apiClient from "@/lib/API/api.client.js";
import queryCache from "@/lib/API/queryCache";
import QuizCard from "./QuizCard"; // Імпортуємо картку сюди
import "@/assets/index.css";

function QuizList({ quizzes }) {
    // Перевірка, чи є дані, щоб не впала помилка
    if (!quizzes || quizzes.length === 0) {
        return <p>Немає доступних тестів.</p>;
    }

    const [useQuizzes, setUseQuizzes] = useState(quizzes);

    useEffect(() => {
        if (quizzes) setUseQuizzes(quizzes);
    }, [quizzes]);

    const handleDelete = async (id) => {
        try {
            const path = `/api/home/delete/${id}`;
            const METHOD = 'DELETE'
            
            await apiClient(path, {method: METHOD});

            queryCache.invalidate('/api/home');

            setUseQuizzes((prev) => prev.filter((quiz) => quiz.id !== id));
        } catch (error) {
            console.error('Delete failed:', error.message);
        }
    };

    return (
        <>
            {/* {value?.map((quiz) => ( */}
            {useQuizzes?.map((quiz) => (
                <QuizCard
                    key={quiz.id} // КЛЮЧ ОБОВ'ЯЗКОВО ТУТ (всередині map)
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description}
                    questionsCount={quiz.questions?.length}
                    onDelete={handleDelete}
                />
            ))}
        </>
    );
}

export default QuizList;
