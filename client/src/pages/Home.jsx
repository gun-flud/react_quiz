import { useState } from 'react';
import { Link } from 'react-router';
import QuizList from '@/features/homepage/components/QuizList.jsx'; 
import { useQuizzes } from '@/quizzes_to_remove/quiz.context.jsx';
import plusIcon from '@/assets/icons/plus-icon.png';

import api from '@/lib/api.client.js';

function Home() {
//     useEffect(() => {
//     subscribe(setQuizzes);
//   }, []);

    const { quizzes, deleteQuiz } = useQuizzes();
    
    // const [quizzes] = useState(tests.quizzes);
    if (!quizzes) {
        return <div className="text-center mt-10">Завантаження тесту...</div>;
    }

    return (
        <div className="container"> 
            <Link className="quiz-card" to="/create">
                <img src={plusIcon} alt="Add Quiz"  className="icon mx-auto" />
            </Link>
            
            {/* Створення списку тестів */}
            <QuizList quizzes={quizzes} /> 
            {/* //test my api */}
            <button className="button" onClick={api}>
                Видалити перший тест
            </button>
        </div>
    )
}

export default Home;