import { useState, useRef, useEffect, useId } from 'react'
import { useParams } from 'react-router';
import QuizEditForm from '../ui/QuizEditForm';
import QuizCreateForm from '../ui/QuizCreateForm.jsx';
import PlayQuiz from '../ui/PlayQuiz.jsx';
import "../index.css";


function Editing() {

    const { id } = useParams();
    
  return (
      <div className="container">
        <form className="quiz-form flex flex-col gap-7 flex-1" onSubmit={ (e) => {
            e.preventDefault();} }> 
            {/* перевірку краще робити на виборі режиму, 
            не розбивати на дві форми: переробити */}
          {id ? <QuizEditForm /> :<QuizCreateForm />}
        </form>
		  </div>
  )

}

export default Editing;

{/* <form onSubmit={...}>
        <Питання1 />
        <Питання2 />
        <Питання3 />
        <button type="submit">Відправити все</button>
      </form> */}

// Rendering a quiz title 
          // <QuestionForm 
          // formType="title"
          // label="Delete" 
          // type="text" 
          // classField=""
          // classForm="" // додатковий клас для стилізації форми
          // classInput="input text-2xl" 
          // classLabel=""  
          // placeholder="Enter quiz title " 
          // /> 


// Rendering a create question form
{/* <form className="quiz-form flex flex-col gap-7 flex-1">  
          <QuestionForm 
          formType="title"
          label="Delete" 
          type="text" 
          classField=""
          classForm="" 
          classInput="input text-2xl" 
          classLabel=""  
          placeholder="Enter quiz title " 
          />  
          
          <QuestionForm 
          formType="question"
          label="Delete" 
          type="text" 
          classField=""
          classForm="" 
          classInput="input text-xl" 
          classLabel="button font-bold flex w-fit items-center"  
          placeholder="Enter quiz title " 
          classOption="option"
          />
          <div className="button mr-auto max-w-18">
            <img src={plusIcon} alt="Add Option"  className="icon" />
          </div>
          <h2 className="question-number text-sky-900">Кількість питань: 30/30</h2>
          <div className=" ">
            <button type="submit" className="button mt-4">Save Quiz</button>
        </div>
        </form> */}