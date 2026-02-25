import QuizCard from "./QuizCard"; // Імпортуємо картку сюди
import "../index.css";

function QuizList({ quizzes }) {
    // Перевірка, чи є дані, щоб не впала помилка
    if (!quizzes || quizzes.length === 0) {
        return <p>Немає доступних тестів.</p>;
    }

    return (
        <>
            {quizzes?.map((quiz) => (
                <QuizCard 
                    key={quiz.id} // КЛЮЧ ОБОВ'ЯЗКОВО ТУТ (всередині map)
                    id={quiz.id}
                    title={quiz.title}
                    description={quiz.description}
                    questionsCount={quiz.questions?.length}
                />
            ))}
        </>
    );
}

export default QuizList;