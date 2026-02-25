import { useId } from 'react';
import PlayOption from './PlayOption.jsx';

function PlayCard( { question } ) { 
    return (
        <>
        <div key={question.id} className="question-form w-full items-start flex  mx-auto p-4">
        <div key={useId()} className="quiz-title text-lg">{question.text}</div>
        {
            question.options.map((option) => (
                <PlayOption keyId={option.id} option={option} id={question.id} onChange='' />
            ))
        }
        </div>
        </>
    );
}

export default PlayCard;