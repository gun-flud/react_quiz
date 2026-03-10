import { useState, useRef, useEffect, useId } from 'react'
import { useParams } from 'react-router';
import QuizEditForm from '../features/forms/components/QuizEditForm.jsx';
import QuizCreateForm from '../features/forms/components/QuizCreateForm.jsx';
import PlayQuiz from '../features/quizzes/components/PlayQuiz.jsx';


function Play() {

    const { id } = useParams();
    
  return (
      <div className="container">
        <form className="quiz-form flex flex-col gap-7 flex-1" onSubmit={ (e) => {
            e.preventDefault();} }> 
          <PlayQuiz QuizId={id} />
        </form>
		  </div>
  )

}

export default Play;