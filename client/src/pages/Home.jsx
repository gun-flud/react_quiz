import { useState } from 'react';
import { Link } from 'react-router';
import QuizList from '../ui/QuizList.jsx'; 
import { useQuizzes } from '../features/quizzes/quiz.context.jsx';
import "../index.css";
import plusIcon from '../assets/plus-icon.png';

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
            
        </div>
    )
}

export default Home;