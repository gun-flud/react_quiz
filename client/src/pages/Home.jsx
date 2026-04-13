import { Link } from "react-router";
import QuizList from "@/features/homepage/components/QuizList.jsx";
import getQuizzes from "@/features/homepage/api/useHomeQuizzes";

import plusIcon from "@/assets/icons/plus-icon.png";

function Home() {
    const { isError, isLoading, isValue: quizzes } = getQuizzes();

    if (isLoading) {
        return <div className="text-center mt-10">
            Завантаження тесту...
            </div>;
    }

    if (isError) {
        return <div className="text-center mt-10">
            Помилка
            </div>;
    }

    // треба додати лоадер, і тоді буде супер, або ми можемо імпортитb
    // значення іс лоадінг разом з QuizList, і таким чином працювати
    return (
        <div className="container">
            <Link className="quiz-card" to="/create">
                <img src={plusIcon} alt="Add Quiz" className="icon mx-auto" />
            </Link>
            {/* Створення списку тестів */}
            <QuizList quizzes={quizzes} />
        </div>
    );
}

export default Home;
