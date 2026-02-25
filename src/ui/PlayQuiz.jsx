import { useId, useState, useEffect} from "react";
import { useQuizzes } from '../features/quizzes/quiz.context.jsx';
import PlayCard from './PlayCard.jsx';
import "../index.css";

function PlayQuiz( { QuizId } ) {
    const [ quizData, setQuizData ] = useState(null);
    const { quizzes, setQuizzes } = useQuizzes();

    //можна додати лоадер 
    //можна додати даних не знайдено

    useEffect(() => {
        if (QuizId && quizzes.length > 0) {
            const foundQuiz = quizzes.find(quiz => quiz.id === parseInt(QuizId));
            if(foundQuiz) {
                setQuizData(foundQuiz);
            } else {
                console.error("Quiz not found");
            }
        }
    }, [QuizId, quizzes])

    // сюди додати рендер перевірок чи є дані чи ні
    if (!quizData) {
        return <div className="text-center mt-10">Завантаження тесту...</div>;
    }
    // і тд  
    return (
        <>
        {/* Тайтл та дескріпшин квіза */}
        <div className="question-form w-full items-start flex  mx-auto p-4">
            <h1 className="quiz-title">{quizData?.title}</h1>
            <p className="quiz-description">{quizData?.description}</p>
            <h2 className="button bg-sky-700 quiz-count">Кількість питань: {quizData?.questions.length}</h2>
        </div>
        {/* Самі квізи */}
        {quizData?.questions.map((question) => (
                <PlayCard question={question} />
            ))}
        <h2 className="question-number text-sky-900">
            Кількість питань: {quizData.questions.length}
        </h2>
        <div className=" ">
            <button type="submit" className="button mt-4" onClick={() => handleSave()}>Save Quiz</button>
        </div>
        </>
    );
}

export default PlayQuiz;


// import { useState, useEffect } from "react";
// import { useQuizzes } from '../features/quizzes/quiz.context.jsx'; // Перевір шлях
// import "../index.css";

// function PlayQuiz({ QuizId }) {
//     // 1. Краще назвати функцію зміни стейту setQuizData (стандарт React)
//     const [quizData, setQuizData] = useState(null);
    
//     // 2. Дістаємо loading, якщо він є в контексті (це корисно)
//     const { quizzes, loading } = useQuizzes(); 

//     useEffect(() => {
//         // Перевіряємо, чи є ID і чи завантажились квізи
//         if (QuizId && quizzes.length > 0) {
            
//             // parseInt важливий, бо з URL ID приходить як рядок "1"
//             const foundQuiz = quizzes.find(quiz => quiz.id === parseInt(QuizId));
            
//             if (foundQuiz) {
//                 setQuizData(foundQuiz);
//             } else {
//                 console.error("Quiz not found id:", QuizId);
//             }
//         }
//     }, [QuizId, quizzes]); // Ефект спрацює знову, коли quizzes оновляться

//     // 3. Відображення станів
    
//     // Якщо дані ще летять з сервера (loading з контексту true)
//     if (loading && !quizData) {
//         return <div className="text-center mt-10">Завантаження тесту...</div>;
//     }

//     // Якщо все завантажилось, але тест не знайдено
//     if (!loading && quizzes.length > 0 && !quizData) {
//         return <div className="text-center mt-10 text-red-500">Тест не знайдено!</div>;
//     }

//     // Якщо даних поки немає (перший рендер), повертаємо null або спінер
//     if (!quizData) return null;

//     // 4. Основний рендер гри
//     return (
//         <div className="container mx-auto p-4">
//             <h1 className="text-2xl font-bold mb-4">{quizData.title}</h1>
//             <p className="mb-6">{quizData.description}</p>
            
//             {/* Тут буде компонент проходження питань */}
//             <div className="questions-list">
//                 {quizData.questions.map(q => (
//                     <div key={q.id} className="mb-4 p-4 border rounded">
//                         {q.text}
//                     </div>
//                 ))}
//             </div>
//         </div>
//     );
// }

// export default PlayQuiz;