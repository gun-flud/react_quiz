import { useState, useRef, useEffect, useId } from 'react'
import { useParams } from 'react-router';
import QuizEditForm from '../ui/QuizEditForm';
import QuizCreateForm from '../ui/QuizCreateForm.jsx';
import PlayQuiz from '../ui/PlayQuiz.jsx';
import "../index.css";


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