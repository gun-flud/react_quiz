import { Link } from 'react-router'
import MoreIconClickHandler from '../logic/functional.jsx';

function QuizCard({ title, description, questionsCount, id }) {
    return (
      <div key={id} className="quiz-card relative">
        <div className="absolute top-4 right-4">
             <MoreIconClickHandler id={id} />
        </div>
        <h2>{title}</h2>
        <p>{description}</p>
        <p>Questions: {questionsCount}</p>
        <div className="flex justify-end mt-auto mb-0">
            <Link to={`/play/${id}`} className="button mt-2.5">Take Quiz</Link>
        </div>
      </div>
    );
}
export default QuizCard;